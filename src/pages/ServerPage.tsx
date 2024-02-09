import { useMemo } from "react";
import { fetchServers } from "../api";
import {
  Header,
  PageContainer,
  Table,
} from "../components";
import { useAuth } from "../context";
import { useQuery } from "@tanstack/react-query";

const Message = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center text-white font-light text-xl py-9">
      {children}
    </div>
  );
};

export const ServerPage = () => {
  const { token } = useAuth();
  const queryFn = fetchServers(token);
  const {
    isPending,
    error,
    data
  } = useQuery({
    queryKey: ["serverData"],
    queryFn,
    refetchOnWindowFocus: false, // dont need to do it for this implementation 🤔
  });

  const renderContent = useMemo(() => {
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

    return <Table data={data} />;
  }, [isPending, error, data]);

  return (
    <PageContainer>
      <Header />

      <div className="w-96 max-w-full mx-auto px-4 mt-9">{renderContent}</div>
    </PageContainer>
  );
};
