import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

type Server = {
  name: string;
  distance: number;
};

const columnHelper = createColumnHelper<Server>(); //Pass User type as the generic TData type

const data: Server[] = [
  {
    name: "Germany",
    distance: 100,
  },
  {
    name: "France",
    distance: 200,
  },
  {
    name: "United States",
    distance: 150,
  },
  {
    name: "Japan",
    distance: 1400,
  },
  {
    name: "Australia",
    distance: 50,
  },
];

const columns = [
  columnHelper.accessor("name", {
    header: () => "Server Name",
  }),
  columnHelper.accessor("distance", {
    header: () => "Distance (km)",
  }),
];

const Table = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
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
                      header.getContext()
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
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
