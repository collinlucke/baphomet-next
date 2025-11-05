import Link from "next/link";
import Image from "next/image";

export const HeadingHomeLink = () => {
  return (
    <Link
      href={"/"}
      data-testid="home-link"
      // css={baphStyles.logoLink}
      aria-label="Baphomet - Go to homepage"
      // onClick={isMobile ? closeSlideOutMenu : undefined}
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

// const getTitleStyles = (isMobile: boolean) => ({
//   margin: 0,
//   ...(isMobile
//     ? {
//         fontSize: "1.5rem",
//       }
//     : {
//         fontSize: "1.6rem",
//         [mediaQueries.minWidth.md]: {
//           fontSize: "1.6rem",
//         },
//         [mediaQueries.minWidth.lg]: {
//           fontSize: "2rem",
//         },
//       }),
// });

// const baphStyles = {
//   logoLink: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     textDecoration: "none",
//     [mediaQueries.minWidth.sm]: {
//       gap: "8px",
//     },
//     [mediaQueries.minWidth.md]: {
//       gap: "10px",
//     },
//     [mediaQueries.minWidth.lg]: {
//       gap: "12px",
//     },
//   },
//   title: {
//     margin: 0,
//     fontSize: "1.5rem",
//     [mediaQueries.minWidth.md]: {
//       fontSize: "1.6rem",
//     },
//     [mediaQueries.minWidth.lg]: {
//       fontSize: "2rem",
//     },
//   },
//   favicon: {
//     width: "40px",
//     height: "40px",
//     objectFit: "contain" as const,
//     [mediaQueries.minWidth.md]: {
//       width: "48px",
//       height: "48px",
//     },
//     [mediaQueries.minWidth.lg]: {
//       width: isMobileVar() ? "52px" : "64px",
//       height: isMobileVar() ? "52px" : "64px",
//     },
//   },
// };
