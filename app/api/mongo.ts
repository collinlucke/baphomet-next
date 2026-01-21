import { MongoClient } from "mongodb";

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`
);

export const db = client.db("baphy");
console.log("connecting to mongo...");
await client.connect();
