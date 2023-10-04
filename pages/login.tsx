import Login from "@/components/login/Login";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function LoginPage() {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
}
