const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Background */}
      <div className="bg-gradient-to-r from-teal-500 to-indigo-500 w-full h-full top-0 left-0 fixed" />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export { PageContainer };