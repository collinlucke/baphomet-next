"use client";
import Link from "next/link";
import { Button, ButtonGroup } from "athameui";

export const HeaderNav = () => {
  return (
    <nav>
      <ButtonGroup>
        <Link href="/arena">
          <Button variant="ghostOnDark" size="small">
            Arena
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="ghostOnDark" size="small">
            Leaderboard
          </Button>
        </Link>
        <Link href="/all-movies">
          <Button variant="ghostOnDark" size="small">
            All Movies
          </Button>
        </Link>
        <Link href="/faq">
          <Button variant="ghostOnDark" size="small">
            FAQ
          </Button>
        </Link>
      </ButtonGroup>
    </nav>
  );
};
