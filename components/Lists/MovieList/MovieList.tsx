"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { MovieListItem } from "./MovieListItem";
import { List } from "../List";
import { getMoviesPaginated } from "@/app/actions/movies";

type Movie = {
  id: string;
  title: string;
  releaseDate?: string;
  rated?: string;
  posterPath?: string;
  winningPercentage: number;
  overview?: string;
  genres?: string[];
  revenue?: number;
  backdropPath?: string;
  tmdbId: string;
};

type MovieData = {
  movies?: Movie[] | null;
  searchTerm?: string;
  totalMovieCount?: string;
  showSearch?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  sortBy?: "winningPercentage" | "title" | "releaseDate";
  onLoadMore?: () => void;

  onScroll?: () => void;
  onSearch?: (searchTerm: string) => void;
  setSearchTerm?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MovieList: React.FC<MovieData> = ({
  movies: externalMovies,
  sortBy = "title",
  onLoadMore: externalOnLoadMore,
  isLoadingMore: externalIsLoadingMore = false,
  hasMore: externalHasMore = false,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [internalMovies, setInternalMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInternalMode = !externalMovies && !externalOnLoadMore;
  const movies = isInternalMode ? internalMovies : externalMovies;
  const isLoadingMore = isInternalMode ? loadingMore : externalIsLoadingMore;
  const hasMoreItems = isInternalMode ? hasMore : externalHasMore;

  const fetchMovies = useCallback(async (skip = 0, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await getMoviesPaginated({ skip, limit: 36, sortBy });

      if (append) {
        setInternalMovies((prev) => [...prev, ...response.movies]);
      } else {
        setInternalMovies(response.movies);
      }

      setHasMore(response.hasMore);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore && internalMovies) {
      fetchMovies(internalMovies.length, true);
    }
  };

  const handleLoadMore = isInternalMode ? loadMore : externalOnLoadMore;

  useEffect(() => {
    if (isInternalMode) {
      fetchMovies();
    }
  }, [isInternalMode, fetchMovies]);

  useEffect(() => {
    if (!handleLoadMore || !hasMoreItems || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [handleLoadMore, hasMoreItems, isLoadingMore]);

  if (isInternalMode && loading) {
    return (
      <div className="w-full" data-testid="baph-movie-list">
        <div className="flex justify-center items-center py-12">
          <div className="text-tertiary-50 text-lg">Loading movies...</div>
        </div>
      </div>
    );
  }

  // Show error state for internal mode
  if (isInternalMode && error) {
    return (
      <div className="w-full" data-testid="baph-movie-list">
        <div className="flex justify-center items-center py-12">
          <div className="text-red-400 text-lg">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!movies) {
    return null;
  }

  return (
    <div className="w-full" data-testid="baph-movie-list">
      <List
        addClasses={{
          list: `grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 w-full p-0 m-0`,
        }}
      >
        {movies.map((movie, index) => (
          <MovieListItem
            key={movie.id || movie.tmdbId || index}
            movie={movie}
          />
        ))}
      </List>

      {isLoadingMore && (
        <div className="flex justify-center items-center py-8">
          <div className="text-tertiary-50 text-lg animate-pulse">
            Loading more movies...
          </div>
        </div>
      )}

      {!hasMoreItems && movies.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="text-tertiary-300 text-sm opacity-60">
            You&apos;ve reached the end of the list
          </div>
        </div>
      )}

      {hasMoreItems && !isLoadingMore && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />
      )}
    </div>
  );
};
