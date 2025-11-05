import Link from "next/link";
import { Button } from "@/components/Buttons/Button";
import { ButtonGroup } from "@/components/Buttons/ButtonGroup";

export const HeadingNav = () => {
  return (
    <nav>
      <ButtonGroup>
        <Link href="/arena">
          <Button variant="ghost" size="small">
            Arena
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="ghost" size="small">
            Leaderboard
          </Button>
        </Link>
        <Link href="/all-movies">
          <Button variant="ghost" size="small">
            All Movies
          </Button>
        </Link>
        <Link href="/faq">
          <Button variant="ghost" size="small">
            FAQ
          </Button>
        </Link>
      </ButtonGroup>
    </nav>
  );
};
