import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
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
    distance: 300,
  },
  {
    name: "Japan",
    distance: 400,
  },
  {
    name: "Australia",
    distance: 500,
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
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
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
