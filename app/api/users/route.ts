import { db } from "@/app/mongo";

export async function GET() {
  try {
    const users = await db
      .collection("users")
      .find(
        {},
        {
          projection: { displayName: 1, _id: 0 },
        }
      )
      .toArray();

    return Response.json(users);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
