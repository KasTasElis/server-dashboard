type SelectInputProps = {
  options: { value: string; label: string }[];
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | undefined;
};

const SelectInput = ({
  options,
  label,
  name,
  onChange,
  value,
}: SelectInputProps) => {
  const renderOptions = () => {
    return options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ));
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-slate-100" htmlFor="sortBy">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="select-icon-left cursor-pointer rounded-md bg-gray-200/80 p-1 text-sm text-gray-800 shadow-md"
        onChange={onChange}
        value={value}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export { SelectInput };
