import { Header as AthameHeader } from "athameui";
import { HeaderHomeLink } from "@/components/HeaderHomeLink";
import { HeaderNav } from "@/components/HeaderNav";

export const Header = () => {
  return (
    <AthameHeader className="flex w-full py-1 px-4 items-center justify-between">
      <HeaderHomeLink />
      <HeaderNav />
    </AthameHeader>
  );
};
