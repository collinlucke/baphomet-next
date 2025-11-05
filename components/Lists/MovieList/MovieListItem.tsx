"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Keep for future use
import { motion } from "motion/react";
import { ContainerScalingText } from "../../ContainerScalingText";
// No actual quotes about missing stuff yet, these are just placeholders
import { missingStuffQuotes } from "../../../lib/quotes.json";

export type MovieListItemProps = {
  movie: {
    id: string;
    title: string;
    posterPath?: string;
    winningPercentage: number;
    tmdbId: string;
  };
};

export const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
  const winningPercentage = movie.winningPercentage?.toFixed(2) || "0.00";
  const [major, minor] = winningPercentage.split(".");
  const [quoteText] = useState<string>(
    () =>
      missingStuffQuotes[Math.floor(Math.random() * missingStuffQuotes.length)]
  );

  return (
    <li
      className="relative cursor-pointer w-full"
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${movie.title}`}
      data-testid={`movie-item-${movie.tmdbId}`}
      key={movie.id}
    >
      <Link
        href={`/movie/${movie.id}`}
        aria-label={`Open details for ${movie.title}`}
        className="block w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            data-state="active"
            className="relative border-2 border-primary-vibrant-300 w-full aspect-2/3 overflow-hidden"
            title={movie.title}
          >
            {movie.posterPath ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                fill
                className="object-cover"
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <ContainerScalingText
                className="text-center leading-tight p-3 text-tertiary-50 items-center flex justify-center h-full"
                maxFontSize={20}
                minFontSize={6}
              >
                {(quoteText as string) || "Not found"}
              </ContainerScalingText>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 right-3 flex items-baseline"
              data-testid="movie-winning-percentage"
            >
              <span
                className="
                  text-primary-vibrant-300
                  font-bold
                  drop-shadow-[2px_2px_4px_rgba(0,0,0,1)]
                  text-3xl sm:text-4xl lg:text-5xl xl:text-5xl
                "
                style={{
                  WebkitTextStroke: "1px #1e3a8a", // replace with baseColors.primary[700]
                  paintOrder: "stroke fill",
                }}
              >
                {major}.
              </span>

              <span
                className="
                  text-primary-vibrant-300
                  font-bold
                  ml-0.5
                  drop-shadow-[2px_2px_4px_rgba(0,0,0,1)]
                  text-xl sm:text-2xl lg:text-3xl xl:text-4xl
                "
                style={{
                  WebkitTextStroke: "1px #1e3a8a", // replace with baseColors.primary[700]
                  paintOrder: "stroke fill",
                }}
              >
                {minor}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </li>
  );
};

// const baphStyles = {
//   container: {
//     position: "relative" as const,
//     display: "flex",
//     cursor: "pointer",
//   },
//   posterWrapper: {
//     position: "relative" as const,
//     flex: "1",
//     aspectRatio: "2 / 3",
//   },
//   poster: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#ccc",
//     backgroundSize: "cover",
//     border: `2px solid ${baseVibrantColors.primary[500]}`,
//   },
//   scoreWrapper: {
//     position: "absolute" as const,
//     bottom: 0,
//     right: "10px",
//     display: "flex",
//     alignItems: "baseline",
//     lineHeight: "normal",
//   },
//   major: {
//     color: baseVibrantColors.primary[500],
//     fontSize: "1.85rem",
//     fontWeight: "bold",
//     WebkitTextStroke: `1px ${baseColors.primary[700]}`,
//     paintOrder: "stroke fill",
//     textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
//     [mediaQueries.minWidth.sm]: {
//       fontSize: "2rem",
//     },
//     [mediaQueries.minWidth.lg]: {
//       fontSize: "2.5rem",
//     },
//     [mediaQueries.minWidth.xl]: {
//       fontSize: "3rem",
//     },
//   },
//   minor: {
//     color: baseVibrantColors.primary[500],
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//     WebkitTextStroke: `1px ${baseColors.primary[700]}`,
//     paintOrder: "stroke fill",
//     marginLeft: "2px",
//     textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
//     [mediaQueries.minWidth.sm]: {
//       fontSize: "1.5rem",
//     },
//     [mediaQueries.minWidth.lg]: {
//       fontSize: "1.85rem",
//     },
//     [mediaQueries.minWidth.xl]: {
//       fontSize: "2.25rem",
//     },
//   },
// };
