import { useAuth } from "@/contexts/AuthContext";
import { IAuthContext } from "@/types/auth";
import { User } from "firebase/auth";
import { useMutation } from "react-query";

export function useAddUpdate<T>(
  mutationFn: (data: T, token: string) => Promise<T>
) {
  const { user } = useAuth() as IAuthContext<User>;
  return useMutation({
    mutationFn: async (data: T) => mutationFn(data, await user.getIdToken()),
  });
}
