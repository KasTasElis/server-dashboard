import { useState } from "react";

type FormState = {
  username: string;
  password: string;
};

type LoginFormProps = {
  isLoading?: boolean;
  onSubmit?: (data: FormState) => unknown;
};

type InputProps = {
  label: string;
  disabled?: boolean;
  name: string;
  type: "text" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  required?: boolean;
  minLength?: number;
};

const Input = ({
  label,
  disabled = false,
  name,
  type = "text",
  value,
  onChange,
  autoFocus = false,
  required = false,
  minLength,
}: InputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-gray-600 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <input
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline"
        placeholder={label}
        disabled={disabled}
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoFocus={autoFocus}
      />
    </>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSubmit }) => {
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
        <Input
          label="Username"
          disabled={isLoading}
          name="username"
          type="text"
          value={state.username}
          onChange={onChange}
          required
          autoFocus
          minLength={3}
        />
      </div>

      <div className="mb-7">
        <Input
          label="Password"
          disabled={isLoading}
          name="password"
          type="password"
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

export { LoginForm };
