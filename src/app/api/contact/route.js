import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getClientIp, checkRateLimit, inspectPayload, sendSecurityIncidentAlert } from '../../../lib/securityGuard';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const runtime = 'nodejs';

function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function getAdminRecipients(defaultFallback) {
  const recipients = new Set();

  try {
    if (db) {
      // 1. Primary: Check themeSettings (where Admin Submissions tab saves contact form notification email)
      const themeSnap = await getDoc(doc(db, 'dorek_cms', 'themeSettings'));
      if (themeSnap.exists()) {
        const themeEmail = themeSnap.data()?.themeSettings?.adminEmail;
        if (themeEmail && typeof themeEmail === 'string' && themeEmail.includes('@')) {
          themeEmail.split(',').forEach(e => {
            const clean = e.trim();
            if (clean && clean.includes('@')) recipients.add(clean);
          });
        }
      }

      // 2. Secondary: Check translations contact email if themeSettings had none
      if (recipients.size === 0) {
        const transSnap = await getDoc(doc(db, 'dorek_cms', 'translationsData'));
        if (transSnap.exists()) {
          const contactEmail = transSnap.data()?.translationsData?.en?.contact?.email;
          if (contactEmail && typeof contactEmail === 'string' && contactEmail.includes('@')) {
            recipients.add(contactEmail.trim());
          }
        }
      }

      // 3. Tertiary: Check notification_settings emails
      if (recipients.size === 0) {
        const notifSnap = await getDoc(doc(db, 'dorek_cms', 'notification_settings'));
        if (notifSnap.exists()) {
          const emails = notifSnap.data()?.emails;
          if (Array.isArray(emails)) {
            emails.forEach(e => {
              if (e && typeof e === 'string' && e.includes('@')) recipients.add(e.trim());
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not read admin email from Firestore, using fallback:', err.message);
  }

  if (recipients.size === 0 && defaultFallback) {
    recipients.add(defaultFallback.trim());
  }

  return Array.from(recipients);
}

export async function POST(request) {
  const clientIp = getClientIp(request);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const envAdminEmail = process.env.ADMIN_EMAIL || 'info@dorek.in';

  try {
    // 1. Rate-Limit Check (Max 10 requests per minute per IP)
    const rateCheck = checkRateLimit(clientIp, 10, 60000);
    if (rateCheck.exceeded) {
      console.warn(`Rate limit exceeded for IP ${clientIp}`);
      sendSecurityIncidentAlert({
        clientIp,
        endpoint: '/api/contact',
        threatType: 'DDoS / Rapid Request Flooding',
        sample: `Request count: ${rateCheck.count} in 60s`,
        smtpUser,
        smtpPass,
        adminEmail: envAdminEmail
      }).catch(e => console.error('Alert error:', e));

      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before submitting again.' }, 
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Deep Cyber Security Threat Inspection (XSS, SQLi, NoSQLi, RCE, Path Traversal)
    const threatAnalysis = inspectPayload(body);
    if (threatAnalysis.isThreat) {
      console.warn(`🚨 Security threat detected from IP ${clientIp}: ${threatAnalysis.type}`);
      
      sendSecurityIncidentAlert({
        clientIp,
        endpoint: '/api/contact',
        threatType: threatAnalysis.type,
        sample: threatAnalysis.sample,
        smtpUser,
        smtpPass,
        adminEmail: envAdminEmail
      }).catch(e => console.error('Alert error:', e));

      return NextResponse.json(
        { error: 'Security violation: Request blocked by Dorek Cyber Defense System.' }, 
        { status: 403 }
      );
    }

    const { name, email, phone, subject, message, adminEmail: clientAdminEmail } = body;

    // 3. Server-side strict trimming and non-blank validation
    const cleanName = (typeof name === 'string' ? name : '').trim();
    const cleanEmail = (typeof email === 'string' ? email : '').trim();
    const cleanMessage = (typeof message === 'string' ? message : '').trim();
    const cleanPhone = (typeof phone === 'string' ? phone : '').trim();
    const cleanSubject = (typeof subject === 'string' ? subject : '').trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: 'Required fields cannot be blank.' }, { status: 400 });
    }

    // 4. Strict input length caps to prevent buffer bloat
    if (cleanName.length > 80 || cleanEmail.length > 100 || cleanPhone.length > 25 || cleanSubject.length > 150 || cleanMessage.length > 2500) {
      return NextResponse.json({ error: 'Payload exceeds permissible character limits.' }, { status: 400 });
    }

    // 5. Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP credentials not configured. Contact submission saved.');
      return NextResponse.json({ success: true, emailSent: false, reason: 'SMTP not configured' });
    }

    // 6. Dynamically resolve admin recipient email(s) from Firestore (matches Admin CMS Settings)
    let targetRecipients = await getAdminRecipients(clientAdminEmail || envAdminEmail);
    if (targetRecipients.length === 0) {
      targetRecipients = [envAdminEmail];
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Sanitize user-provided values
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(cleanPhone || 'Not provided');
    const safeSubject = escapeHtml(cleanSubject || 'Customer Inquiry');
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />');

    // Accurate Indian Standard Time (IST - Asia/Kolkata)
    const istDate = new Date().toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const istTime = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const mailOptions = {
      from: `"Dorek Website" <${smtpUser}>`,
      to: targetRecipients,
      replyTo: cleanEmail,
      subject: `📬 Website Inquiry: ${safeSubject}`,
      priority: 'high',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      },
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="background: #0A2E5D; padding: 22px; text-align: center; border-bottom: 3px solid #D4AF37;">
            <h2 style="color: #D4AF37; margin: 0; font-size: 20px; letter-spacing: 1px;">DOREK INTERNATIONAL</h2>
            <p style="color: #ffffff; margin: 6px 0 0 0; font-size: 13px;">Official Website Customer Inquiry</p>
          </div>
          <div style="background: #ffffff; padding: 24px;">
            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; color: #065f46; font-size: 13px; font-weight: 600;">
                🕒 Received at ${istTime} on ${istDate} (IST)
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 130px;">Sender Name:</td>
                <td style="padding: 10px 0; color: #1e293b; font-weight: 700;">${safeName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                <td style="padding: 10px 0; color: #0A2E5D; font-weight: 700;"><a href="mailto:${safeEmail}" style="color: #0A2E5D; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                <td style="padding: 10px 0; color: #1e293b;">
                  ${phone ? `<a href="tel:${safePhone}" style="color: #0A2E5D; font-weight: 700; text-decoration: none;">${safePhone}</a>` : 'Not provided'}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Inquiry Topic:</td>
                <td style="padding: 10px 0; color: #1e293b; font-weight: 700;">${safeSubject}</td>
              </tr>
            </table>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <div style="font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">Message Content:</div>
              <p style="color: #334155; margin: 0; line-height: 1.6; font-size: 14px;">${safeMessage}</p>
            </div>

            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              Submitted from IP: ${clientIp} • Verified Safe by Dorek Cyber Defense
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Website contact inquiry forwarded to ${targetRecipients.join(', ')}`);
    return NextResponse.json({ success: true, emailSent: true, recipients: targetRecipients });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
