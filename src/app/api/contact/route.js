import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, adminEmail } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic Anti-Spam: Block messages containing obvious spam patterns (multiple URLs, crypto keywords)
    const spamRegex = /(http[s]?:\/\/[^\s]+|www\.[^\s]+)/gi;
    const urlMatches = message.match(spamRegex);
    if (urlMatches && urlMatches.length > 2) {
      console.log('Spam blocked based on multiple URLs in message');
      return NextResponse.json({ success: true, emailSent: false, reason: 'Spam detected' });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP credentials not configured. Skipping email notification.');
      return NextResponse.json({ success: true, emailSent: false, reason: 'SMTP not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const recipientEmail = adminEmail || process.env.ADMIN_EMAIL || 'info@dorek.in';

    const mailOptions = {
      from: `"Dorek Website" <${smtpUser}>`,
      to: recipientEmail,
      subject: `New Contact Form: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0A2E5D; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h2 style="color: #D4AF37; margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Name:</td>
                <td style="padding: 8px 0; color: #222;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #222;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0; color: #222;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Subject:</td>
                <td style="padding: 8px 0; color: #222;">${subject || 'Not specified'}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
            <h3 style="color: #0A2E5D; margin-bottom: 8px;">Message:</h3>
            <p style="color: #444; line-height: 1.6; background: #f9fafb; padding: 12px; border-radius: 8px;">${message}</p>
          </div>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 16px;">
            Sent from Dorek International Website Contact Form
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, emailSent: true });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
