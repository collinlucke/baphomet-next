type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
};
