import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const user = auth.getCurrentUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      await auth.login(data);
      navigate("/exercises");
    } catch (error: any) {
      setIsLoading(false);
      if (error.response?.status === 400) {
        setError("username", { message: error.response.data });
      }
    }
  }

  if (user) return <Navigate to="/exercises" />;
  if (isLoading)
    return (
      <div>
        <h1 className="text-center text-2xl font-bold">Loading...</h1>
        <h2 className="text-center text-md">
          Please note: It may take up to a minute for the data to load due to
          cold starts on Render
        </h2>
      </div>
    );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="workout"
          src="/images/workout.png"
          style={{ width: 150, height: 150 }}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Login Page
        </h2>
        <div className="text-center">
          <p className="mt-2 text-center text-sm text-secondary">
            Need an account?
            <Link to="/" className="font-semibold text-success ml-1">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                {...register("username")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-neutral-300 sm:text-sm"
              />
              {errors.username && (
                <p className="text-error text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-neutral-300 sm:text-sm"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-success px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
