import clsx from "clsx";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  isLoading?: boolean;
  serverError?: string;
};

// TODO: 🚩refactor input fields to a separate component

export const LoginForm = ({ isLoading = false, onSubmit, serverError }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (serverError) {
      reset();
    }
  }, [serverError, reset]);

  return (
    <form
      className="bg-slate-100 p-4 rounded-lg border shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-600 text-xs font-bold mb-2"
        >
          Username
        </label>
        <input
          autoFocus
          className={clsx(
            "border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline",
            { "border-red-500": errors.username }
          )}
          placeholder="Username"
          {...register("username", {
            required: "Please enter your username.",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long.",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-600 text-xs font-bold mb-2"
        >
          Password
        </label>
        <input
          className={clsx(
            "border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline",
            { "border-red-500": errors.password }
          )}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Please enter your password.",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters long.",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
        
        {serverError ? <p className="text-red-500">{serverError}</p> : null}
      </div>
    </form>
  );
};
