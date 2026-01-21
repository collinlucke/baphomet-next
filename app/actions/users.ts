"use server";

import { db } from "@/app/api/mongo";

export type User = {
  id: string;
  displayName?: string;
  totalVotes: number;
};

export type UsersResponse = {
  users: User[];
  hasMore: boolean;
  total?: number;
};

export async function getLeaderboard(
  skip = 0,
  limit = 10
): Promise<UsersResponse> {
  try {
    const users = await db
      .collection("users")
      .find(
        {},
        {
          projection: {
            _id: 1,
            displayName: 1,
            totalVotes: 1,
          },
        }
      )
      .sort({ totalVotes: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalCount =
      skip === 0 ? await db.collection("users").countDocuments() : null;

    const formatUsers: User[] = users.map((user) => {
      const { _id, ...rest } = user;
      return {
        id: _id.toString(),
        ...rest,
      };
    }) as User[];

    const hasMore = totalCount
      ? skip + formatUsers.length < totalCount
      : formatUsers.length === limit;
    return {
      users: formatUsers,
      hasMore,
      total: totalCount || undefined,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
