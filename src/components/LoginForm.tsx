import { useState } from "react";

type FormState = {
  username: string;
  password: string;
};

type LoginFormProps = {
  isLoading?: boolean;
  onSubmit?: (data: FormState) => unknown;
};

const LoginForm: React.FC<LoginFormProps> = ({
  isLoading,
  onSubmit,
}) => {
  const [state, setState] = useState<FormState>({ username: "", password: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(state);
    }
  };

  return (
    <form
      className="bg-slate-100 p-4 rounded-lg border shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-600 text-xs font-bold mb-2"
        >
          Username
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline"
          placeholder="Username"
          disabled={isLoading}
          name="username"
          id="username"
          type="text"
          value={state.username}
          onChange={onChange}
          required
          minLength={3}
          autoFocus
        />
      </div>

      <div className="mb-7">
        <label
          htmlFor="password"
          className="block text-gray-600 text-xs font-bold mb-2"
        >
          Password
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline"
          disabled={isLoading}
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          value={state.password}
          onChange={onChange}
          required
          minLength={3}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Log In"}
      </button>
    </form>
  );
};

export { LoginForm }