import { LoginForm } from "../components";
import { useSignIn } from "../hooks";

const SignInPage = () => {
  const { signIn, isLoading, error } = useSignIn();

  return (
    <div className="bg-gradient-to-r from-teal-500 to-indigo-500">
      <div className="container mx-auto min-h-screen flex flex-col justify-center px-4">
        <h1 className="text-center mb-5 text-3xl text-slate-200 font-light">
          Log In
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 mb-3 text-center w-96 mx-auto rounded max-w-full">
            {error}
          </div>
        )}

        <div className="w-96 mx-auto max-w-full">
          <LoginForm isLoading={isLoading} onSubmit={signIn} />
        </div>
      </div>
    </div>
  );
};

export { SignInPage };
