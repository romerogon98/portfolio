import { createHash, createHmac, timingSafeEqual } from "crypto";

// Shared-password gate for /work/private — no per-user sessions, just a single
// HMAC-derived token stored in a cookie once the shared password is entered.
export const PRIVATE_AUTH_COOKIE = "pw_auth";
export const PRIVATE_AUTH_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

// Hashing both sides first normalizes length so timingSafeEqual never throws
// on a length mismatch, and keeps the comparison itself constant-time.
export function passwordMatches(candidate: string): boolean {
  const expected = process.env.PRIVATE_WORK_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(sha256(candidate), sha256(expected));
}

export function computeAuthToken(): string | null {
  const secret = process.env.PRIVATE_WORK_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update("granted").digest("hex");
}

export function hasValidAuthCookie(cookieValue: string | undefined): boolean {
  // Local convenience only: skip the gate while developing. NODE_ENV is
  // "production" in any real deploy, so the password is still enforced there.
  if (process.env.NODE_ENV === "development") return true;
  if (!cookieValue) return false;
  const expected = computeAuthToken();
  if (!expected) return false;
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
