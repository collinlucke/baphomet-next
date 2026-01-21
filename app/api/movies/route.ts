import { db } from "@/app/api/mongo";

export async function GET() {
  try {
    const movies = await db
      .collection("movies")
      .find(
        {},
        {
          projection: {
            id: 1,
            title: 1,
            posterPath: 1,
            winningPercentage: 1,
            tmdbId: 1,
            _id: 0,
          },
        }
      )
      .toArray();

    return Response.json(movies);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
