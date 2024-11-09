// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

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
  if (req.method === "POST") {

    let rating = user.rating;
    const diff = req.body.difficulty;
    const correction = req.body.correction;
    // const { diff, correction } = req.query;

    if(diff==1)
    {
        console.log("here");
        rating = rating + correction*10  - (5-correction)*5;
    }
    else if(diff==2)
    {
        rating = rating + correction*20  - (5-correction)*5;
    }
    else if(diff==3)
    {
        rating = rating + correction*30  - (5-correction)*5;
    }
    else
    {
        rating = rating + correction*40  - (5-correction)*5;
    }

    rating = Math.max(0,rating);

    const result = await users.updateOne(
      { _id: objID },
        { $set: { rating: rating } }
    );

    console.log(result, rating);

    if(result.modifiedCount === 1)
    {
      session.user.rating = rating; 
      res.status(200).json({ message: "Rating Updated" });
    }
    else
    {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
