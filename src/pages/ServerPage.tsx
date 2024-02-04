import { useQuery } from "@tanstack/react-query";
import { fetchServers } from "../api";
import { useToken } from "../context";
import { useSignOut } from "../hooks";

export const ServerPage = () => {
  const token = useToken();
  const signOut = useSignOut();

  const { isPending, error, data } = useQuery({
    queryKey: ["serverData"],
    queryFn: () => fetchServers(token),
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="bg-gradient-to-r from-teal-500 to-indigo-500 shadow-lg border-b">
        <div className="container flex justify-between items-center mx-auto py-3 px-4">
          <h1 className="text-xl text-slate-200 font-light">
            Server Dashboard
          </h1>
          <button
            onClick={signOut}
            className="bg-red-500 rounded p-3 py-2 text-white"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="container mx-auto px-4">
          {isPending && <div>Loading...</div>}

          {error && <div>Error: {error.message}</div>}

          <table className="w-full max-w-xl mx-auto mb-7">
            <thead>
              <tr className="text-left bg-slate-300 min-w-full">
                <th className="px-4 py-3 min-w-full border">Server Name</th>
                <th className="px-4 py-3 min-w-full border">Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(({ name, distance }, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-1">{name}</td>
                    <td className="border px-4 py-1">{distance}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
