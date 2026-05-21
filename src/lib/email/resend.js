// src/lib/email/resend.js
import { Resend } from "resend";

export const FROM_ADDRESS = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
export const TO_ADDRESS   = process.env.EMAIL_TO ?? "";

let _resend = null;

export function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  if (!TO_ADDRESS) {
    throw new Error("Missing EMAIL_TO environment variable");
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}