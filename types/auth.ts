import { User, UserCredential } from "firebase/auth";

export interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IAuthContext<T = User | null> {
  user: T;
  loading: boolean;
  logUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}
