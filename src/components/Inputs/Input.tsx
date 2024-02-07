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

export { Input };
