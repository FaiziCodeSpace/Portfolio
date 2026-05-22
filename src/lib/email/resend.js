// src/lib/email/resend.js  (repurposed as transport.js or just edit in place)
import nodemailer from "nodemailer";

export const TO_ADDRESS = process.env.EMAIL_TO ?? "";

export function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}