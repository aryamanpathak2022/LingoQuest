// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  const users = await db.collection("Users");

  if (req.method === "GET") {

    // Fetch filtered questions from the database
    const users = await db.collection("Users").find().toArray();

    console.log(users);
    const extractedData = users.map(user => ({
        username: user.username,
        rating: user.rating
      }));

    const sortedData = extractedData.sort((a, b) => b.rating - a.rating);

    res.status(200).json(sortedData);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}