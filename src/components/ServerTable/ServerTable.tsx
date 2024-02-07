import clsx from "clsx";
import { SelectInput } from "..";
import { useServerData } from "../../hooks";
import { SortBy } from "../../utils";
import { Server } from "../../api";

const SORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "name-ascending", label: "Name (A-Z)" },
  { value: "name-descending", label: "Name (Z-A)" },
  { value: "distance-ascending", label: "Distance (Low to High)" },
  { value: "distance-descending", label: "Distance (High to Low)" },
];

const Message = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center text-white font-light text-xl py-9">
      {children}
    </div>
  );
};

interface ServerTableProps {
  serverData: Server[];
  isPending?: boolean;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  error: Error | null;
}

export const ServerTableContainer = () => {
  const {
    isPending,
    error,
    data: serverData,
    setSortBy,
    sortBy,
  } = useServerData();

  return (
    <ServerTable
      serverData={serverData}
      isPending={isPending}
      sortBy={sortBy}
      setSortBy={setSortBy}
      error={error}
    />
  );
};

export const ServerTable: React.FC<ServerTableProps> = ({
  serverData,
  isPending = false,
  sortBy,
  setSortBy,
  error,
}) => {
  const renderServerDataRows = () => {
    return serverData.map(({ distance, name }, i) => (
      <tr
        key={i}
        className={clsx(
          "border-b border-white/20 bg-white/20 text-slate-100 hover:bg-white/50",
          {
            "bg-white/40": i % 2 === 0,
          }
        )}
      >
        <td className="border-r px-4 py-1 border-white/40">{name}</td>
        <td className="px-4 py-1">{distance}</td>
      </tr>
    ));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortBy);
  };

  if (isPending)
    return (
      <Message>
        <h1 className="animate-pulse">⏳ Loading data...</h1>
      </Message>
    );

  if (error)
    return (
      <Message>
        <h1>{error.message || "🤦‍♂️ Something went wrong..."}</h1>
      </Message>
    );

  if (!serverData || serverData.length === 0)
    return (
      <Message>
        <h1>🤦‍♂️ No data to show...</h1>
      </Message>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-5">
        <SelectInput
          label="Sort by"
          options={SORT_OPTIONS}
          name="sortBy"
          value={sortBy}
          onChange={onChange}
        />
      </div>

      <table className="w-full max-w-full mb-7 rounded-md overflow-hidden shadow-lg">
        <thead>
          <tr className="text-left bg-white/70 min-w-full text-slate-700">
            <th className="px-4 py-3 min-w-full border-r hover:bg-white/50">
              Server Name
            </th>
            <th className="px-4 py-3 min-w-full hover:bg-white/50">
              Distance (km)
            </th>
          </tr>
        </thead>
        <tbody>{renderServerDataRows()}</tbody>
      </table>
    </div>
  );
}