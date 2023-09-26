import { useAuth } from "@/contexts/AuthContext";
import { signInSchema } from "@/schemas/signInSchema";
import { IUserCredentials } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastOptions, toast } from "react-toastify";
import Toast from "../admin/common/Toast";
import TextInput from "../admin/common/form/TextInput";
import Logo from "../common/Logo";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>({
    resolver: yupResolver(signInSchema),
  });

  const { logIn } = useAuth();

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const onSubmit = async (data: IUserCredentials) => {
    try {
      await logIn(data.email, data.password);
    } catch (error: any) {
      const message = error.message || "Something went wrong!";
      notify(message, { type: "error" });
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] m-4">
      <div className="w-full lg:w-[500px] mx-auto bg-gray-100 p-6 rounded">
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
            <div className="grid grid-cols-1 gap-2">
              <button
                type="submit"
                className="text-white bg-accentDark hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center !w-full"
              >
                Log In
              </button>
              <p className="text-gray-400 text-center">or</p>
              <Link
                href="/signup"
                className="hover:underline text-accentDark font-semibold text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Toast />
    </div>
  );
}
