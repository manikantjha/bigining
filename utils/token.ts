import { getEnvVariable } from "./server";
import { SignOptions, sign, verify } from "jsonwebtoken";

export const signJWT = async (
  payload: string | object | Buffer,
  options: SignOptions
) => {
  try {
    const secret = getEnvVariable("JWT_SECRET");
    const token = sign(payload, secret, { ...options });
    return token;
  } catch (error) {
    throw new Error("Failed to sign JWT!");
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    const secret = getEnvVariable("JWT_SECRET");
    if (!secret) {
      throw new Error(`The environment variable JWT_SECRET is not set!`);
    }
    return verify(token, secret) as T;
  } catch (error) {
    throw new Error("Your token has expired!");
  }
};
