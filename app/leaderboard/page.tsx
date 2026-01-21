"use client";
import { useEffect, useState } from "react";
import { Main } from "@/components/Main";
import { PageTitle } from "@/components/PageTitle";
import { BackToTopButton } from "athameui";
import { Leaderboard } from "@/components/Leaderboard/Leaderboard";
import { getLeaderboard } from "@/app/actions/users";

export type LeaderboardUser = {
  id: string;
  displayName?: string;
  totalVotes: number;
};

type LeaderboardType = {
  users: LeaderboardUser[];
  hasMore: boolean;
};

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardType>({
    users: [],
    hasMore: false,
  });

  useEffect(() => {
    if (leaderboardData.users.length === 0) {
      getLeaderboard().then((data) => setLeaderboardData(data));
    }
  });
  console.log(leaderboardData);
  return (
    <Main>
      <PageTitle
        title="Leaderboard"
        subtitle="Basically, it's a quantifiable list of who's better than you"
      />
      <Leaderboard
        leaderboard={leaderboardData.users}
        hasMore={leaderboardData.hasMore}
      />
      <BackToTopButton dark />
    </Main>
  );
}
