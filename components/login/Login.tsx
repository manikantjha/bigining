import { useAuth } from "@/contexts/AuthContext";
import { signInSchema } from "@/schemas/signInSchema";
import { IUserCredentials } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Toast from "../admin/common/Toast";
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

  const onSubmit = async (data: IUserCredentials) => {
    try {
      await logIn(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] m-4">
      <div className="w-full lg:w-[500px] mx-auto bg-gray-100 p-6 rounded">
        <div className="mb-6 mx-auto">
          <Logo isVertical />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
              placeholder="sample@email.com"
              {...register(`email`)}
            />
            {errors.email && (
              <p className="text-red-700 mt-2 text-sm">
                * {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
              required
              {...register(`password`)}
            />
            {errors.password && (
              <p className="text-red-700 mt-2 text-sm">
                * {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-accentDark hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center !w-full"
          >
            Log In
          </button>
          <div className="text-center">
            <p className="my-2 text-gray-400">or</p>
            <Link
              href="/signup"
              className="hover:underline text-accentDark font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <Toast />
    </div>
  );
}
