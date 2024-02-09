import clsx from "clsx";
import { Server } from "../../api";
import { useMemo } from "react";

const Message = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center text-white font-light text-xl py-9">
      {children}
    </div>
  );
};

interface ServerTableProps {
  data: Server[];
  isPending?: boolean;
  error?: Error | undefined | null;
}

export const ServerTable: React.FC<ServerTableProps> = ({
  data,
  isPending = false,
  error,
}) => {
  const rows = useMemo(() => {
    return data.map(({ distance, name }, i) => (
      <tr
        key={`${name}-${i}`}
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
  }, [data]);

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

  if (!data || data.length === 0)
    return (
      <Message>
        <h1>🤦‍♂️ No data to show...</h1>
      </Message>
    );

  return (
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
      <tbody>{rows}</tbody>
    </table>
  );
};
