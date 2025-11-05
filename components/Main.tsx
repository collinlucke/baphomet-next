type MainProps = {
  children: React.ReactNode;
  addClasses?: {
    main?: string;
  };
};

export const Main = ({ children, addClasses }: MainProps) => {
  return (
    <main
      className={`w-full relative px-8 py-8 m-0 flex flex-col gap-5 ${
        addClasses?.main || ""
      }`}
    >
      {children}
    </main>
  );
};
