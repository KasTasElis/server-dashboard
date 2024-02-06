import { LoginForm, PageContainer } from "../components";
import { useSignIn } from "../hooks";

const SignInPage = () => {
  const { signIn, isLoading, error } = useSignIn();

  return (
    <PageContainer>
      <div className="w-96 max-w-full mx-auto min-h-screen flex flex-col justify-center px-4">
        <h1 className="text-center mb-5 text-3xl text-white font-light">
          Log In
        </h1>

        {error && (
          <div className="bg-red-500/90 text-white p-3 mb-3 text-center rounded">
            {error}
          </div>
        )}

        <LoginForm isLoading={isLoading} onSubmit={signIn} />
      </div>
    </PageContainer>
  );
};

export { SignInPage };
