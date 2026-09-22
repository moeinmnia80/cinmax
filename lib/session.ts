import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expireAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expireAt,
    path: "/",
  });
}

type SessionPayload = {
  userId: string;
  expireAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.log("Failed to verify session \n", err);
    return null;
  }
}
