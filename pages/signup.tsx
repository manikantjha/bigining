import Signup from "@/components/signup/Signup";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function SignupPage() {
  return (
    <AuthContextProvider>
      <Signup />
    </AuthContextProvider>
  );
}
