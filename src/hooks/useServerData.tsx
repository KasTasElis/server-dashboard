import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchServers } from "../api";
import { useToken } from "../context";
import { SortBy, getSortedServerData } from "../utils";

const useServerData = () => {
  const token = useToken();
  const [sortBy, setSortBy] = useState<SortBy>("none");

  const {
    isPending,
    error,
    data: unsortedData,
  } = useQuery({
    queryKey: ["serverData"],
    queryFn: () => fetchServers(token),
    refetchOnWindowFocus: false, // dont need to do it for this implementation
  });

  const sortedData = getSortedServerData(unsortedData || [], sortBy);

  return { isPending, error, data: sortedData, setSortBy, sortBy };
};

export { useServerData };
