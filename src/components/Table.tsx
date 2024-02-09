import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Server } from "../api";

const columnHelper = createColumnHelper<Server>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Server Name",
  }),
  columnHelper.accessor("distance", {
    header: () => "Distance (km)",
  }),
];

type TableProps = {
  data: Server[];
};

const Table = ({ data }: TableProps) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="mb-7 w-full max-w-full overflow-hidden rounded-md shadow-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="min-w-full bg-white/70 text-left text-slate-700"
          >
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="min-w-full border-r px-4 py-3 hover:bg-white/50"
                >
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="border-b border-white/20 bg-white/20 text-slate-100 even:bg-white/40 hover:bg-white/50"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-r border-white/40 px-4 py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
