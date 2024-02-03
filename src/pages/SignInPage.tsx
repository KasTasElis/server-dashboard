import { LoginForm } from "../components";

const SignInPage = () => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-indigo-500">
      <div className="container mx-auto min-h-screen flex flex-col justify-center px-4">
        <h1 className="text-center mb-5 text-3xl text-slate-200 font-light">
          Log In
        </h1>

        <div className="w-96 mx-auto max-w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export { SignInPage };
