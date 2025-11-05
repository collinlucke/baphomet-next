import { HeadingHomeLink } from "@/components/HeadingHomeLink";
import { HeadingNav } from "@/components/NavsAndMenues/HeadingNav";

export const Heading = () => {
  return (
    <header className="w-full py-1 px-4 bg-secondary-600 flex items-center justify-between">
      <HeadingHomeLink />
      <HeadingNav />
    </header>
  );
};
