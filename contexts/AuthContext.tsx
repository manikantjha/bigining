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
    const token = localStorage.getItem("token");
    // I should probably check here if it's a valid token before proceeding further.
    // I can't verify JWT here as I don't have access to env variables here.
    if (token) {
      setUser(token);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
