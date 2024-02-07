import { useQuery } from "@tanstack/react-query";
import { fetchServers } from "../api";
import { useToken } from "../context";
import clsx from "clsx";
import { useState } from "react";
import { Header, PageContainer } from "../components";
import { SortBy, getSortedServerData } from "../utils";

const Message = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center text-white font-light text-xl py-9">
      {children}
    </div>
  );
};

// sorting should be a parameter?
const useServerData = () => {
  const token = useToken();

  const {
    isPending,
    error,
    data: unsortedData,
  } = useQuery({
    queryKey: ["serverData"],
    queryFn: () => fetchServers(token),
    refetchOnWindowFocus: false, // dont need to do it for this implementation
  });
  const [sortBy, setSortBy] = useState<SortBy | undefined>();

  const sortedData = getSortedServerData(unsortedData, sortBy);

  return { isPending, error, data: sortedData };
};

const SelectSortBy = ({ value, onChange }) => {
  return (
    <div className="flex gap-3 items-center">
      <label className="text-slate-100" htmlFor="sortBy">
        Sort By:
      </label>
      <select
        name="sortBy"
        id="sortBy"
        className="cursor-pointer bg-gray-200/80 text-gray-800 text-sm p-1 rounded-md select-icon-left shadow-md"
        onChange={onChange}
        value={value}
      >
        <option value={undefined}>None</option>
        <option value="name-ascending">Name (A-Z)</option>
        <option value="name-descending">Name (Z-A)</option>
        <option value="distance-ascending">Distance (ASC)</option>
        <option value="distance-descending">Distance (DSC)</option>
      </select>
    </div>
  );
};

const ServerTable = () => {
  const { isPending, error, data: serverData } = useServerData();

  if (isPending)
    return (
      <Message>
        <h1 className="animate-pulse">⏳ Loading...</h1>
      </Message>
    );

  if (error)
    return (
      <Message>
        <h1>{error.message}</h1>
      </Message>
    );

  if (!serverData || serverData.length === 0)
    return (
      <Message>
        <h1>🤦‍♂️ Nothing to show...</h1>
      </Message>
    );

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

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-5">
        <div className="flex gap-3 items-center">
          <label className="text-slate-100" htmlFor="sortBy">
            Sort By:
          </label>
          <select
            name="sortBy"
            id="sortBy"
            className="cursor-pointer bg-gray-200/80 text-gray-800 text-sm p-1 rounded-md select-icon-left shadow-md"
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            value={sortBy}
          >
            <option value={undefined}>None</option>
            <option value="name-ascending">Name (A-Z)</option>
            <option value="name-descending">Name (Z-A)</option>
            <option value="distance-ascending">Distance (ASC)</option>
            <option value="distance-descending">Distance (DSC)</option>
          </select>
        </div>
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
};

export const ServerPage = () => {
  return (
    <PageContainer>
      <Header />

      <div className="w-96 max-w-full mx-auto">
        <ServerTable />
      </div>
    </PageContainer>
  );
};
