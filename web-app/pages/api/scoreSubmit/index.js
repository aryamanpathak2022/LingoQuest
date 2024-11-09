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

  if (req.method === "POST") {
    let rating = user.rating;
    const diff = req.body.difficulty;
    const correction = req.body.correction;
    console.log(rating,diff,correction);

    // Calculate the rating based on difficulty and correction factors
    switch (diff) {
      case "easy":
        rating += correction * 10 - (5 - correction) * 5;
        break;
      case "medium":
        rating += correction * 20 - (5 - correction) * 5;
        break;
      case "hard":
        rating += correction * 30 - (5 - correction) * 5;
        break;
      case "advance":
        rating += correction * 40 - (5 - correction) * 5;
        break;
      case "potd":
        rating += correction * 50;
        break;
      default:
        break;
    }

    rating = Math.max(0, rating);

    // Update the user's rating in the database
    const result = await users.updateOne(
      { _id: objID },
      { $set: { rating: rating } }
    );

    console.log(result, rating);

    if (result.modifiedCount === 1) {
      // Update the session's user rating, if needed
      session.user.rating = rating;
      res.status(200).json({ message: "Rating Updated" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
