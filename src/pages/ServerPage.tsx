import { Header, PageContainer, ServerTable } from "../components";

export const ServerPage = () => {
  return (
    <PageContainer>
      <Header />

      <div className="w-96 max-w-full mx-auto">
        <ServerTable />
      </div>
    </PageContainer>
  );
};
