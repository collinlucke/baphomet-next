"use client";
import Link from "next/link";
import { Button } from "athameui";

export const LinkToFaq = () => {
  return (
    <Link href="/faq">
      <Button variant="tertiary" dark>
        Interested in knowing more? Go FAQ yourself!
      </Button>
    </Link>
  );
};
