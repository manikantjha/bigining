import { signout } from "@/services/apiServices";
import { auth } from "@/services/firebaseServices";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
      //   {
      //   uid: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      // }
    } else {
      setUser(null);
    }
    setLoading(false);
    // });
    // return () => unsubscribe();
  }, []);

  // function signup(email: string, password: string) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  // function login(email: string, password: string) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  async function logout() {
    localStorage.removeItem("token");
    setUser(null);
    await signout({});
  }

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
