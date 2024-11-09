// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  if (req.method === "GET") {
    const questions = await db.collection("Quizzes").find().toArray();
    let idx=Math.floor(Math.random() *( questions.length));
    let idx1=Math.floor(Math.random() *( questions[idx].questions.length));
    res.status(200).json(questions[idx].questions[idx1]);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}