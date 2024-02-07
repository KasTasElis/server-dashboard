import { useSignOut } from "../hooks";

const Header = () => {
  const signOut = useSignOut();

  return (
    <>
      {/* Provides spacer at the top */}
      <div className="h-16 min-w-full" />

      <div className="backdrop-blur-sm bg-white/10 shadow-lg fixed top-0 left-0 min-w-full min-h-16">
        <div className="container flex justify-between items-center mx-auto py-3 px-4">
          <h1 className="text-xl text-white font-light">🚀 Dashboard</h1>
          <button
            onClick={signOut}
            className="bg-red-500 rounded p-3 py-2 text-white hover:bg-red-400"
          >
            👋 Log out
          </button>
        </div>
      </div>
    </>
  );
};

export { Header };
