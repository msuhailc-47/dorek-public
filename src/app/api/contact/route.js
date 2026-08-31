import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getClientIp, checkRateLimit, inspectPayload, sendSecurityIncidentAlert } from '../../../lib/securityGuard';

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

export async function POST(request) {
  const clientIp = getClientIp(request);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || 'info@dorek.in';

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
        adminEmail
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
      
      // Dispatch immediate high-priority warning email to admin
      sendSecurityIncidentAlert({
        clientIp,
        endpoint: '/api/contact',
        threatType: threatAnalysis.type,
        sample: threatAnalysis.sample,
        smtpUser,
        smtpPass,
        adminEmail
      }).catch(e => console.error('Alert error:', e));

      return NextResponse.json(
        { error: 'Security violation: Request blocked by Dorek Cyber Defense System.' }, 
        { status: 403 }
      );
    }

    const { name, email, phone, subject, message } = body;

    // 3. Server-side required fields validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 4. Strict input length caps to prevent buffer bloat
    if (name.length > 80 || email.length > 100 || (phone && phone.length > 25) || (subject && subject.length > 150) || message.length > 2500) {
      return NextResponse.json({ error: 'Payload exceeds permissible character limits.' }, { status: 400 });
    }

    // 5. Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP credentials not configured. Contact submission saved.');
      return NextResponse.json({ success: true, emailSent: false, reason: 'SMTP not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Sanitize user-provided values
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeSubject = escapeHtml(subject || 'Customer Inquiry');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const mailOptions = {
      from: `"Dorek Website" <${smtpUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: `📬 Website Inquiry: ${safeSubject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0A2E5D; padding: 20px; text-align: center; border-bottom: 3px solid #D4AF37;">
            <h2 style="color: #D4AF37; margin: 0; font-size: 18px;">DOREK INTERNATIONAL</h2>
            <p style="color: #ffffff; margin: 4px 0 0 0; font-size: 13px;">Official Website Inquiry</p>
          </div>
          <div style="background: #ffffff; padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 700;">${safeName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #0A2E5D; font-weight: 700;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0; color: #1e293b;">${safePhone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
                <td style="padding: 8px 0; color: #1e293b;">${safeSubject}</td>
              </tr>
            </table>
            <div style="margin-top: 18px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Message:</strong>
              <p style="color: #334155; margin: 6px 0 0 0; line-height: 1.5; font-size: 14px;">${safeMessage}</p>
            </div>
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 20px;">
              Submitted from IP: ${clientIp} • Verified Safe by Dorek Security
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, emailSent: true });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
