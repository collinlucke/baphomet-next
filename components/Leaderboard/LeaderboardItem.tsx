import type { LeaderboardUser as User } from "@/app/leaderboard/page";

type LeaderboardItemProps = {
  user: User;
  rank: number;
};

const getRankDisplay = (rank: number): string => {
  if (rank === 1) return "👑";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

const getRankClasses = (rank: number): string => {
  const baseClasses =
    "flex items-center justify-between px-5 py-4 my-2 rounded-xl relative transition-all duration-300 overflow-hidden text-primary-900";

  if (rank === 1) {
    return `${baseClasses} bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600 border-2 border-yellow-400 text-[#2C1810] font-bold shadow-[0_8px_32px_rgba(255,215,0,0.3),0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_8px_32px_rgba(255,215,0,0.3),0_0_30px_rgba(255,215,0,0.8)]`;
  }

  if (rank === 2) {
    return `${baseClasses} bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 border-2 border-gray-300 text-[#2C2C2C] font-semibold shadow-[0_6px_24px_rgba(192,192,192,0.3),0_0_15px_rgba(192,192,192,0.4)] hover:shadow-[0_6px_24px_rgba(192,192,192,0.3),0_0_25px_rgba(192,192,192,0.6)]`;
  }

  if (rank === 3) {
    return `${baseClasses} bg-gradient-to-br from-[#CD7F32] via-yellow-600 to-[#A0522D] border-2 border-[#CD7F32] text-[#2C1810] font-semibold shadow-[0_4px_16px_rgba(205,127,50,0.3),0_0_12px_rgba(205,127,50,0.4)] hover:shadow-[0_4px_16px_rgba(205,127,50,0.3),0_0_20px_rgba(205,127,50,0.6)]`;
  }

  return `${baseClasses} bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-300 shadow-[0_2px_8px_rgba(20,107,104,0.1)] hover:shadow-[0_4px_16px_rgba(20,107,104,0.2)]`;
};

const getRankDisplayClasses = (rank: number): string => {
  return rank <= 3
    ? "text-2xl font-bold min-w-[60px] text-center [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]"
    : "text-lg font-bold min-w-[50px] text-center";
};

const getNameClasses = (rank: number): string => {
  if (rank === 1) {
    return "text-xl font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] flex-1";
  }
  if (rank === 2) {
    return "text-lg font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] flex-1";
  }
  if (rank === 3) {
    return "text-base font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] flex-1";
  }
  return "text-base font-normal flex-1";
};

const getVoteCountClasses = (rank: number): string => {
  return rank <= 3
    ? "text-lg font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
    : "text-base font-bold";
};

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  user,
  rank,
}) => {
  const rankDisplay = getRankDisplay(rank);

  return (
    <li className={getRankClasses(rank)}>
      <div className="flex items-center gap-4 flex-1">
        <div className={getRankDisplayClasses(rank)}>{rankDisplay}</div>
        <div className={getNameClasses(rank)}>
          {user.displayName || `¯\_(ツ)_/¯`}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className={getVoteCountClasses(rank)}>
          {user.totalVotes.toLocaleString()}
        </div>
        <div className="text-xs opacity-80 uppercase tracking-wider">
          {user.totalVotes === 1 ? "vote" : "votes"}
        </div>
      </div>
    </li>
  );
};
