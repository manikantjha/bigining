import { NextResponse } from "next/server";

type EnvVariableKey =
  | "JWT_SECRET"
  | "JWT_EXPIRES_IN"
  | "MONGO_URI"
  | "NEXT_PUBLIC_FIREBASE_CONFIG"
  | "NEXT_PUBLIC_DEV_BASE_PATH"
  | "NEXT_PUBLIC_BASE_PATH"
  | "ADMIN_EMAIL"
  | "EMAIL"
  | "EMAIL_PASS";

export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: any | null = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
