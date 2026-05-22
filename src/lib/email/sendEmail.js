// src/lib/email/sendEmail.js
import { getTransporter, TO_ADDRESS } from "./resend.js";

export async function sendEmail({ subject, html, replyTo }) {
  try {
    const transporter = getTransporter();
    const result = await transporter.sendMail({
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: TO_ADDRESS,
      subject,
      html,
      ...(replyTo && { replyTo }),
    });
    console.log("[sendEmail] Sent:", result.messageId);
    return { success: true };
  } catch (err) {
    console.error("[sendEmail] Error:", err);
    return { success: false, error: err.message };
  }
}