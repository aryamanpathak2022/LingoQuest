// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import axios from "axios";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  const users = await db.collection("Users");

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  const objID= new ObjectId(session.user.sub);

  const user = await users.findOne({ _id: objID });
  console.log(session,user);
  if (req.method === "GET") {
    const chatHistory = user.chatHistory;

    res.status(200).json({ message: chatHistory, success: true });

  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
