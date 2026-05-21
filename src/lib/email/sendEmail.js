// src/lib/email/sendEmail.js
import { getResend, FROM_ADDRESS, TO_ADDRESS } from "./resend.js";

export async function sendEmail({ subject, html, replyTo }) {
  try {
    const payload = {
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      subject,
      html,
    };

    if (replyTo) payload.reply_to = replyTo;

    console.log("[sendEmail] Sending with payload:", {
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
    });

    // Call getResend() explicitly — avoids Proxy swallowing real errors
    const resend = getResend();
    const result = await resend.emails.send(payload);

    console.log("[sendEmail] Resend result:", JSON.stringify(result));

    if (result.error) {
      console.error("[sendEmail] Resend error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendEmail] Unexpected error:", err);
    return { success: false, error: "Failed to send email." };
  }
}