import Login from "@/components/login/Login";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function login() {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
}
