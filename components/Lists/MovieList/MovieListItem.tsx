"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ContainerScalingText } from "../../ContainerScalingText";
import { missingStuffQuotes } from "../../../lib/quotes";

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
      className="relative cursor-pointer w-full hover:scale-[1.02] transition-transform duration-200 ease-in-out"
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
            className="relative border-2 border-primary-vibrant-300 w-full aspect-2/3"
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
                  text-primary-vibrant-500
                  font-bold
                  drop-shadow-[2px_2px_4px_rgba(0,0,0,1)]
                  text-5xl
                "
                style={{
                  WebkitTextStroke: "1px #1e3a8a",
                  paintOrder: "stroke fill",
                }}
              >
                {major}.
              </span>

              <span
                className="
                  text-primary-vibrant-500
                  font-bold
                  ml-0.5
                  drop-shadow-[2px_2px_4px_rgba(0,0,0,1)]
                  text-4xl
                "
                style={{
                  WebkitTextStroke: "1px #1e3a8a",
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
