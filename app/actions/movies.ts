"use server";

import { db } from "@/app/api/mongo";

export type Movie = {
  id: string;
  title: string;
  posterPath?: string;
  winningPercentage: number;
  tmdbId: string;
};

export type MoviesResponse = {
  movies: Movie[];
  hasMore: boolean;
  total?: number;
};

export type MoviesPaginatedParams = {
  skip?: number;
  limit?: number;
  sortBy?: "winningPercentage" | "title" | "releaseDate";
};

export async function getMoviesPaginated({
  skip = 0,
  limit = 36,
  sortBy = "title",
}: MoviesPaginatedParams): Promise<MoviesResponse> {
  try {
    const movies = await db
      .collection("movies")
      .find(
        {},
        {
          projection: {
            _id: 1,
            title: 1,
            posterPath: 1,
            winningPercentage: 1,
            tmdbId: 1,
          },
        },
      )
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortBy === "winningPercentage" ? -1 : 1,
        _id: 1,
      })
      .toArray();

    const totalCount =
      skip === 0 ? await db.collection("movies").countDocuments() : null;

    const formatMovies = movies.map((movie) => {
      const { _id, ...rest } = movie;
      return {
        ...rest,
        id: _id.toString(),
      };
    }) as Movie[];

    const hasMore = totalCount
      ? skip + formatMovies.length < totalCount
      : formatMovies.length === limit;

    return {
      movies: formatMovies,
      hasMore,
      total: totalCount || undefined,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}
