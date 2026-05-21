/** Validates an email string. Returns an error message or null. */
export function validateEmail(email) {
  if (!email || typeof email !== "string") return "Email is required.";
  const trimmed = email.trim();
  if (trimmed.length > 254) return "Email address is too long.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
  return null;
}

/** Validates a plain-text message. Returns an error message or null. */
export function validateMessage(message, { minLength = 10, maxLength = 5000 } = {}) {
  if (!message || typeof message !== "string") return "Message is required.";
  const trimmed = message.trim();
  if (trimmed.length < minLength) return `Message must be at least ${minLength} characters.`;
  if (trimmed.length > maxLength) return `Message must be under ${maxLength} characters.`;
  return null;
}

/** Sanitises a string: strips HTML tags and trims whitespace. */
export function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Detects obvious spam patterns. Returns true if the content looks like spam. */
export function isSpam(fields) {
  const combined = Object.values(fields).join(" ").toLowerCase();

  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|click here|free money|earn \$)\b/i,
    /https?:\/\/[^\s]{3,}.*https?:\/\/[^\s]{3,}/,   // multiple links
    /(.)\1{8,}/,                                      // excessive repeated chars
  ];

  return spamPatterns.some((pattern) => pattern.test(combined));
}

/** Rate-limit helper (in-memory, resets on cold start — use Redis/KV for prod). */
const ipBuckets = new Map();

export function isRateLimited(ip, { windowMs = 60_000, maxRequests = 5 } = {}) {
  const now = Date.now();
  const bucket = ipBuckets.get(ip) ?? { count: 0, resetAt: now + windowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }

  bucket.count += 1;
  ipBuckets.set(ip, bucket);

  return bucket.count > maxRequests;
}