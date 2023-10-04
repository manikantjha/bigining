import { signUpSchema } from "@/schemas/signUpSchema";
import { signUp } from "@/services/apiServices";
import { ISignupForm, IUserCredentials } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import Toast from "../admin/common/Toast";
import TextInput from "../admin/common/form/TextInput";
import Logo from "../common/Logo";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: yupResolver(signUpSchema),
  });

  const router = useRouter();

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const signUpMutation = useMutation(signUp);

  const onSubmit = async (data: IUserCredentials) => {
    try {
      const response = await signUpMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      if (response.token) {
        notify("Successfully signed up!", { type: "success" });
        router.push("/admin");
      }
      if (response.error) {
        notify(response.error, { type: "error" });
      }
    } catch (error: any) {
      const message = error.message || "Something went wrong!";
      notify(message, { type: "error" });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[500px] mx-auto bg-gray-100 p-6 rounded">
        <div className="mb-6 mx-auto">
          <Logo isVertical />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <TextInput
              label="Your Email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="example@email.com"
            />
            <TextInput
              label="Your Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
            />
            <TextInput
              label="Re-enter Your Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              type="password"
            />
            <div className="grid grid-cols-1 gap-2">
              <button
                type="submit"
                className="text-white bg-accentDark hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-gray-400 text-center">or</p>
              <Link
                href="/login"
                className="hover:underline text-accentDark font-semibold text-center"
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Toast />
    </div>
  );
}
