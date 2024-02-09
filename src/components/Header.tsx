import { useAuth } from "../context";

const Header = () => {
  const { signOut } = useAuth();

  return (
    <>
      {/* Provides spacer at the top */}
      <div className="h-16 min-w-full" />

      <div className="min-h-16 fixed left-0 top-0 min-w-full bg-white/10 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-light text-white">🚀 Dashboard</h1>
          <button
            onClick={signOut}
            className="rounded bg-red-500 p-3 py-2 text-white hover:bg-red-400"
          >
            👋 Log out
          </button>
        </div>
      </div>
    </>
  );
};

export { Header };
