// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import axios from "axios";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  const users = await db.collection("Users");

  if (req.method === "POST") {
    const topic = req.body.message;
    const language = req.body.language;

    // const {topic, language} = req.query;
    const chatHistory=[];

    const message = "I am learning "+language+" and I am trying to write a blog on "+topic+". Can you help me with that?";

    try {
        const response = await axios.post('http://localhost:8000/chat', {
          message,
          chat_history: chatHistory
        });

        res.status(200).json({ message: response.data.response, success: true });

      } catch (error) {
        console.error("Error communicating with chat API:", error);
        return null;
      }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
