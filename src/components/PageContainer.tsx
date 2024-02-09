const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Background */}
      <div className="fixed left-0 top-0 h-full w-full bg-gradient-to-r from-teal-500 to-indigo-500" />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export { PageContainer };
