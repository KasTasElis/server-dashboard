import { fetchServers } from "../api";
import {
  Header,
  PageContainer,
  useServerTable,
  ServerTable,
  SelectInput,
} from "../components";
import { useAuth } from "../context";
import { SortBy } from "../utils";

const SORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "name-ascending", label: "Name (A-Z)" },
  { value: "name-descending", label: "Name (Z-A)" },
  { value: "distance-ascending", label: "Distance (Low to High)" },
  { value: "distance-descending", label: "Distance (High to Low)" },
];

export const ServerPage = () => {
  const { token } = useAuth();
  const queryFn = fetchServers(token);
  const { data, isPending, sortBy, setSortBy, error } = useServerTable(queryFn);

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as SortBy);

  return (
    <PageContainer>
      <Header />

      <div className="w-96 max-w-full mx-auto px-4 mt-9">
        <div className="mb-5">
          <SelectInput
            name="sortBy"
            label="Sort By"
            options={SORT_OPTIONS}
            onChange={onSortChange}
            value={sortBy}
          />
        </div>

        <ServerTable data={data} error={error} isPending={isPending} />
      </div>
    </PageContainer>
  );
};
