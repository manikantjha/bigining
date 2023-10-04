import { auth } from "@/services/firebaseServices";
import { IAuthContext } from "@/types/auth";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<IAuthContext<User | null>>(
  {} as IAuthContext<User | null>
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);
  const router = useRouter();

  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/admin");
  };

  const logUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth).then(clear);
    setLoading(false);
  };

  const handleAuthStateChange = async (authState: User | null) => {
    setLoading(true);

    if (!authState) {
      setUser(null);

      setLoading(false);
      return;
    }
    setUser(authState);

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return () => unsubscribe();
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, loading, logIn, logOut, logUp }}>
      {children}
    </AuthContext.Provider>
  );
}
