// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");

  // Extract language and difficulty from query parameters
  const { language, difficulty } = req.query;

  if (req.method === "GET") {
    // Build the query object dynamically based on the presence of filters
    const query = {};
    if (language) query.language = language;
    if (difficulty) query.difficulty = difficulty;
    if (difficulty === "potd")
    {
      const questions = await db.collection("Quizzes").find().toArray();
      let idx=Math.floor(Math.random() *( questions.length));
      let idx1=Math.floor(Math.random() *( questions[idx].questions.length));
      res.status(200).json(questions[idx].questions[idx1]);
    }
    console.log(query);
    // Fetch filtered questions from the database
    const questions = await db.collection("Quizzes").find(query).toArray();
    res.status(200).json(questions);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}