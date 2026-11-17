import { randomBytes } from "node:crypto";

const SHORT_CODE_LENGTH = 7;

export function generateShortCode(): string {
  return randomBytes(6).toString("base64url").slice(0, SHORT_CODE_LENGTH);
}
