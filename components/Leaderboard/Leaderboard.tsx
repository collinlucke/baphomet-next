import { useEffect, useRef } from "react";
import type { LeaderboardUser } from "@/app/leaderboard/page";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleArrowUp02Icon } from "@hugeicons/core-free-icons";
import { LeaderboardItem } from "./LeaderboardItem";

type LeaderboardProps = {
  leaderboard: LeaderboardUser[];
  hasMore: boolean;
  isLoadingMore?: boolean;
  onScroll?: () => void;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboard,
  hasMore,
  isLoadingMore = false,
  onScroll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoadingMore) {
          onScroll?.();
        }
      },
      {
        root: scrollRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, isLoadingMore, onScroll]);

  return (
    <div ref={scrollRef} className="w-full max-w-4xl mx-auto">
      <ul className="flex flex-col">
        {leaderboard.map((user, index) => (
          <LeaderboardItem key={user.id} user={user} rank={index + 1} />
        ))}
      </ul>
      {hasMore && (
        <div ref={sentinelRef} className="h-5 my-2.5">
          {isLoadingMore && <p>Loading more users...</p>}
        </div>
      )}
      {!hasMore && leaderboard.length > 0 && (
        <p>
          This is the worst person ever!{" "}
          <HugeiconsIcon icon={CircleArrowUp02Icon} size={20} />
        </p>
      )}
    </div>
  );
};
