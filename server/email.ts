import { MailService } from '@sendgrid/mail';

// For development, we'll use a mock email service if SENDGRID_API_KEY is not set
const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

// Base64 encoded email to prevent scraping
const ENCODED_RECIPIENT = "YWJoaXNoZWsxMjM1ODBAbWFpbC5jb20="; // abhishek123580@gmail.com

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactMessage): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      // In development, just log the message
      console.log('Development mode - Email would be sent:', {
        to: Buffer.from(ENCODED_RECIPIENT, 'base64').toString('utf-8'),
        from: 'noreply@portfolio.com',
        subject: `Portfolio Contact from ${data.name}`,
        text: `From: ${data.name} (${data.email})\n\nMessage: ${data.message}`,
      });
      return true;
    }

    const recipientEmail = Buffer.from(ENCODED_RECIPIENT, 'base64').toString('utf-8');

    await mailService.send({
      to: recipientEmail,
      from: 'noreply@portfolio.com',
      subject: `Portfolio Contact from ${data.name}`,
      text: `From: ${data.name} (${data.email})\n\nMessage: ${data.message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}