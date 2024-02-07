import { Header, PageContainer, ServerTableContainer } from "../components";

export const ServerPage = () => {
  return (
    <PageContainer>
      <Header />

      <div className="w-96 max-w-full mx-auto">
        <ServerTableContainer />
      </div>
    </PageContainer>
  );
};
