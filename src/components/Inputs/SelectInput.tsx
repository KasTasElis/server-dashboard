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
    <div className="flex gap-3 items-center">
      <label className="text-slate-100" htmlFor="sortBy">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="cursor-pointer bg-gray-200/80 text-gray-800 text-sm p-1 rounded-md select-icon-left shadow-md"
        onChange={onChange}
        value={value}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export { SelectInput };
