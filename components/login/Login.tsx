import { login } from "@/services/apiServices";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import * as yup from "yup";
import Toast from "../admin/common/Toast";
import Logo from "../common/Logo";

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
  })
  .required();

export default function Login() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const loginMutation = useMutation(login);
  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      if (response.token) {
        localStorage.setItem("token", response.token);
        notify("Logged in successfully!", { type: "success" });
        router.push("/admin/heros");
      }
      if (response.error) {
        notify(response.error, { type: "error" });
      }
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
