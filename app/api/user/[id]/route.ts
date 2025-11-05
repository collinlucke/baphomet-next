import { db } from "@/app/mongo";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await db
    .collection("users")
    .findOne(
      { _id: new ObjectId(params.id) },
      { projection: { firstName: 1, lastName: 1, _id: 0 } }
    );
  console.log(user);
  return Response.json(user);
}
