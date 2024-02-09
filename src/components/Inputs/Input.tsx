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
        className="mb-2 block text-xs font-bold text-gray-600"
      >
        {label}
      </label>
      <input
        className="w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline"
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

export { Input };
