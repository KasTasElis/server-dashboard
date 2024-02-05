import { useQuery } from "@tanstack/react-query";
import { Server, fetchServers } from "../api";
import { useToken } from "../context";
import { useSignOut } from "../hooks";
import clsx from "clsx";
import { useState } from "react";

const Header = () => {
  const signOut = useSignOut();

  return (
    <>
      {/* Provides spacer at the top */}
      <div className="h-16 min-w-full" />

      <div className="backdrop-blur-sm bg-white/10 shadow-lg fixed top-0 left-0 min-w-full min-h-16">
        <div className="container flex justify-between items-center mx-auto py-3 px-4">
          <h1 className="text-xl text-white font-light">🚀 Dashboard</h1>
          <button
            onClick={signOut}
            className="bg-red-500 rounded p-3 py-2 text-white hover:bg-red-400"
          >
            👋 Log out
          </button>
        </div>
      </div>
    </>
  );
};

const Message = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center text-white font-light text-xl py-9">
      {children}
    </div>
  );
};

const sortServersByDistanceAscending = (servers: Server[]) => {
  return [...servers].sort((a, b) => a.distance - b.distance);
};

const sortServersByDistanceDescending = (servers: Server[]) => {
  return [...servers].sort((a, b) => b.distance - a.distance);
};

const sortServersByNameAscending = (servers: Server[]) => {
  return [...servers].sort((a, b) => a.name.localeCompare(b.name));
};

const sortServersByNameDescending = (servers: Server[]) => {
  return [...servers].sort((a, b) => b.name.localeCompare(a.name));
};

type SortBy =
  | "name-ascending"
  | "name-descending"
  | "distance-ascending"
  | "distance-descending"
  | null;

const getSortedData = (data: Server[], sorting?: SortBy) => {
  if (sorting === "name-ascending") return sortServersByNameAscending(data);
  if (sorting === "name-descending") return sortServersByNameDescending(data);
  if (sorting === "distance-ascending")
    return sortServersByDistanceAscending(data);
  if (sorting === "distance-descending")
    return sortServersByDistanceDescending(data);

  return data;
};

const ServerList = () => {
  const token = useToken();

  const { isPending, error, data } = useQuery({
    queryKey: ["serverData"],
    queryFn: () => fetchServers(token),
    refetchOnWindowFocus: false, // dont need to do it for this implementation
  });

  const [sorting, setSorting] = useState<SortBy>(null);

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

  if (data.length === 0)
    return (
      <Message>
        <h1>🤦‍♂️ Nothing to show...</h1>
      </Message>
    );

  const sortedData = getSortedData(data, sorting);

  return (
    <div className="container mx-auto px-4 py-10">

      <div>
        <p>Sorty By:</p>
        <div className="flex space-x-3">
          <button
            onClick={() => setSorting("name-ascending")}
            className="bg-white/10 hover:bg-white/20 rounded p-2"
          >
            Name (A-Z)
          </button>
          <button
            onClick={() => setSorting("name-descending")}
            className="bg-white/10 hover:bg-white/20 rounded p-2"
          >
            Name (Z-A)
          </button>
          <button
            onClick={() => setSorting("distance-ascending")}
            className="bg-white/10 hover:bg-white/20 rounded p-2"
          >
            Distance (ASC)
          </button>
          <button
            onClick={() => setSorting("distance-descending")}
            className="bg-white/10 hover:bg-white/20 rounded p-2"
          >
            Distance (DESC)
          </button>
          </div>  
      </div>

      <table className="w-full max-w-xl mx-auto mb-7 rounded-md overflow-hidden shadow-lg">
        <thead>
          <tr className="text-left bg-white/70 min-w-full text-slate-700">
            <th className="px-4 py-3 min-w-full border-r cursor-pointer hover:bg-white/50">
              Server Name
            </th>
            <th className="px-4 py-3 min-w-full cursor-pointer hover:bg-white/50">
              Distance (km)
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(({ distance, name }, i) => (
            <tr
              key={i}
              className={clsx(
                "border-b border-white/20 bg-white/20 text-slate-100 hover:bg-white/50",
                {
                  // Add a different background color for every other row
                  "bg-white/40": i % 2 === 0,
                }
              )}
            >
              <td className="border-r px-4 py-1 border-white/40">{name}</td>
              <td className="px-4 py-1">{distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ServerPage = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-indigo-500 min-h-screen">
      <Header />

      <div>
        <ServerList />
      </div>
    </div>
  );
};
