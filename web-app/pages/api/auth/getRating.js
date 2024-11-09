// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  const users = db.collection("Users");

  const session = await getServerSession(req, res, authOptions);
  let objID;

  if (!session || !session.user.id) {
    // Default to a specific ObjectId if there's no valid session
    objID = new ObjectId('672e0c1c8293831e6b0d8191');
  } else {
    objID = new ObjectId(session.user.id); // Use `session.user.id` directly
  }

  const user = await users.findOne({ _id: objID });
  console.log(session, user);

  if (req.method === "GET") {
    let rating = user.rating;

    res.status(200).json({ rating: rating }, { success: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
