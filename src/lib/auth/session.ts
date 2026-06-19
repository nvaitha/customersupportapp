import "server-only";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { SESSION_MAX_AGE_SECONDS } from "./constants";

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Missing SESSION_SECRET env var");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const expectedBuf = Buffer.from(expected, "hex");
  const signatureBuf = Buffer.from(signature, "hex");
  if (expectedBuf.length !== signatureBuf.length) return false;
  if (!timingSafeEqual(expectedBuf, signatureBuf)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export function passwordMatches(submitted: string): boolean {
  const appPassword = process.env.APP_PASSWORD;
  if (!appPassword) throw new Error("Missing APP_PASSWORD env var");

  const submittedHash = createHash("sha256").update(submitted).digest();
  const expectedHash = createHash("sha256").update(appPassword).digest();
  return timingSafeEqual(submittedHash, expectedHash);
}
