// import Link from "next/link";
import Link from "next/link";
import Image from "next/image";

export const HeaderHomeLink = () => {
  return (
    <Link
      href={"/"}
      data-testid="home-link"
      aria-label="Baphomet - Go to homepage"
      className="flex items-center gap-2 align-middle"
    >
      <div className="font-light color-light-text text-3xl">Baphomet</div>
      <Image
        width={64}
        height={64}
        src="/baphy-favicon.png"
        alt="Baphomet logo"
        role="presentation"
        aria-hidden="true"
      />
    </Link>
  );
};
