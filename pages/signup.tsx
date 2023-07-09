import Signup from "@/components/signup/Signup";
import { AuthContextProvider } from "@/contexts/AuthContext";
import React from "react";

export default function signup() {
  return (
    <AuthContextProvider>
      <Signup />
    </AuthContextProvider>
  );
}
