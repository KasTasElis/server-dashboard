import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Server } from "../../api";
import { SortBy, getSortedServerData } from "../../utils";

type FetchServers = () => Promise<Server[]>;

const useServerTable = (queryFn: FetchServers) => {
  const {
    isPending,
    error,
    data: unsortedData,
  } = useQuery({
    queryKey: ["serverData"],
    queryFn,
    refetchOnWindowFocus: false, // dont need to do it for this implementation 🤔
  });
  const [sortBy, setSortBy] = useState<SortBy>("none");

  const data = useMemo(() => {
    return getSortedServerData(unsortedData || [], sortBy);
  }, [unsortedData, sortBy]);

  return { data, isPending, sortBy, setSortBy, error };
};

export { useServerTable }