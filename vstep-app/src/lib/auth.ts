import { jwtVerify, SignJWT } from "jose";

import { AUTH_TOKEN_TTL_SECONDS } from "@/constants/auth";
import type { AuthTokenPayload } from "@/types/auth";

function getJwtSecret(): Uint8Array {
  const secret = process.env.AUTH_JWT_SECRET;

  if (!secret) {
    throw new Error("Missing AUTH_JWT_SECRET environment variable.");
  }

  return new TextEncoder().encode(secret);
}

export async function signAuthToken(payload: AuthTokenPayload): Promise<string> {
  const secret = getJwtSecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${AUTH_TOKEN_TTL_SECONDS}s`)
    .sign(secret);
}

export async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);

    return {
      sub: String(payload.sub ?? "single-user"),
      email: String(payload.email ?? ""),
      fullName: String(payload.fullName ?? ""),
    };
  } catch {
    return null;
  }
}
