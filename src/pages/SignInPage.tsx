import { LoginForm, PageContainer } from "../components";
import { useAuth } from "../context";

const SignInPage = () => {
  const { signIn, isLoading, error } = useAuth();

  return (
    <PageContainer>
      <div className="mx-auto flex min-h-screen w-96 max-w-full flex-col justify-center px-4">
        <h1 className="mb-5 text-center text-3xl font-light text-white">
          Log In
        </h1>

        {error && (
          <div className="mb-3 rounded bg-red-500/90 p-3 text-center text-white">
            {error}
          </div>
        )}

        <LoginForm isLoading={isLoading} onSubmit={signIn} />
      </div>
    </PageContainer>
  );
};

export { SignInPage };
