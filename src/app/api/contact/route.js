// src/app/api/contact/route.js
import { NextResponse } from "next/server";
import {
  sendEmail,
  bookingEmailHtml,
  contactEmailHtml,
  validateEmail,
  sanitize,
  isSpam,
  isRateLimited,
} from "@/lib/email/index";

export async function POST(request) {
  try {
    // ── 1. Rate limiting ──────────────────────────────────────────────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip, { maxRequests: 3 })) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // ── 2. Parse body ─────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const email   = sanitize(body.email   ?? "");
    const name    = sanitize(body.name    ?? "");
    const message = sanitize(body.message ?? "");

    // ── 3. Validate email ─────────────────────────────────────────────────
    const emailError = validateEmail(email);
    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 422 });
    }

    // ── 4. Spam check ─────────────────────────────────────────────────────
    if (isSpam({ name, email, message })) {
      return NextResponse.json({ success: true });
    }

    // ── 5. Route by type ──────────────────────────────────────────────────
    const plan = body.plan ?? null;

    let html, subject;

    if (plan) {
      // Booking enquiry from Pricing modal — plan can have any id/name/price
      const phone   = sanitize(body.phone   ?? "");
      const website = sanitize(body.website ?? "");
      const date    = sanitize(body.date    ?? "");
      const time    = sanitize(body.time    ?? "");

      html    = bookingEmailHtml({ plan, name, email, phone, website, date, time, message });
      subject = `[Booking] ${plan.name} plan enquiry from ${name || email}`;
    } else {
      // General contact form
      const subject_field = sanitize(body.subject ?? "");

      html    = contactEmailHtml({ name, email, subject: subject_field, message });
      subject = `[Contact] ${subject_field || "New message"} from ${name || email}`;
    }

    // ── 6. Send ───────────────────────────────────────────────────────────
    const { success, error } = await sendEmail({ subject, html, replyTo: email });

    if (!success) {
      return NextResponse.json(
        { error: "Failed to send your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact] Unhandled error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}