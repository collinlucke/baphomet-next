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
  movies?: Movie[] | null; // Make optional for backward compatibility
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
  movies: externalMovies, // Optional external movies prop
  onLoadMore: externalOnLoadMore,
  isLoadingMore: externalIsLoadingMore = false,
  hasMore: externalHasMore = false,
}) => {
  // Internal state for when component manages its own data
  const [internalMovies, setInternalMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Determine if we're managing data internally or using external props
  const isInternalMode = !externalMovies && !externalOnLoadMore;
  const movies = isInternalMode ? internalMovies : externalMovies;
  const isLoadingMore = isInternalMode ? loadingMore : externalIsLoadingMore;
  const hasMoreItems = isInternalMode ? hasMore : externalHasMore;

  const fetchMovies = useCallback(
    async (skip = 0, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const response = await getMoviesPaginated(skip, 36);

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
    },
    []
  );

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
        rootMargin: "100px", // Start loading 100px before the sentinel comes into view
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

  // Show loading state for initial load in internal mode
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

      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="flex justify-center items-center py-8">
          <div className="text-tertiary-50 text-lg animate-pulse">
            Loading more movies...
          </div>
        </div>
      )}

      {/* End of list indicator */}
      {!hasMoreItems && movies.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="text-tertiary-300 text-sm opacity-60">
            You&apos;ve reached the end of the list
          </div>
        </div>
      )}

      {/* Intersection observer sentinel */}
      {hasMoreItems && !isLoadingMore && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />
      )}
    </div>
  );
};

// const baphStyles: { [key: string]: CSSObject } = {
//   sentinel: {
//     height: "1px",
//     width: "100%",
//     backgroundColor: "transparent",
//   },

//   searchForm: {
//     position: "sticky",
//     zIndex: 10,
//     top: 0,
//     padding: "35px 0",
//     justifyContent: "end",
//     "&:after": {
//       content: '""',
//       display: "block",
//       width: "100vw",
//       height: "-webkit-fill-available",
//       position: "absolute",
//       top: 0,
//       right: "50%",
//       transform: "translateX(50%)",

//       zIndex: -1,
//       backdropFilter: "blur(50px)",
//       WebkitBackdropFilter: "blur(50px)",
//     },
//   },
//   noResults: {
//     display: "flex",
//     flexDirection: "column" as const,
//     alignItems: "center",
//     marginBottom: "30px",
//     marginTop: "30px",
//     color: baphColorVariations.tertiary[50],
//   },
//   list: {
//     display: "grid",
//     gap: "15px",
//     listStyleType: "none",
//     paddingInlineStart: 0,
//     margin: 0,
//     width: "100%",
//     gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
//     [mediaQueries.minWidth.md]: {
//       gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
//       gap: "20px",
//     },
//     [mediaQueries.minWidth.lg]: {
//       gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
//       gap: "25px",
//     },
//     [mediaQueries.minWidth.xl]: {
//       gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//       gap: "35px",
//     },
//   },
//   movieListWrapper: {
//     display: "flex",
//     flexDirection: "column" as const,
//     width: "100%",
//   },
//   searchWrapper: {
//     position: "relative" as const,
//     backgroundColor: "transparent",
//     top: 0,
//     maxWidth: "1024px",
//   },
//   resultsText: {
//     color: baphColorVariations.tertiary[50],
//   },
//   loadingContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "2rem",
//     marginTop: "2rem",
//   },
//   loadingText: {
//     color: baseColors.tertiary[50],
//     fontSize: "1.1rem",
//     fontWeight: "bold",
//     opacity: 0.8,
//     "@keyframes pulse": {
//       "0%": { opacity: 0.4 },
//       "50%": { opacity: 1 },
//       "100%": { opacity: 0.4 },
//     },
//     animation: "pulse 2s infinite",
//   },
//   endContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "3rem 2rem",
//     marginTop: "2rem",
//   },
//   endText: {
//     color: baseColors.tertiary[50],
//     fontSize: "1.2rem",
//     fontWeight: "bold",
//     opacity: 0.6,
//     textAlign: "center" as const,
//   },
// };
