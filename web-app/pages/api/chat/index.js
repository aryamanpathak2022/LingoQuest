// /pages/api/questions/index.js
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]"; // Ensure this path is correct
import { ObjectId } from "mongodb";
import axios from "axios";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  const users = db.collection("Users");

  // Retrieve the session
  const session = await getServerSession(req, res, authOptions);
  let objID;

  if (!session) {
    // Default user ID if no session exists
    objID = new ObjectId('672e0c1c8293831e6b0d8191');
  } else {
    // Use the session user ID
    objID = new ObjectId(session.user.id); // Ensure `session.user.id` matches your stored MongoDB ID
  }

  // Retrieve the user from the database
  const user = await users.findOne({ _id: objID });
  console.log("Session:", session, "User:", user);

  if (req.method === "POST") {
    const message = req.body.message;
    let chatHistory = user?.chatHistory || [];

    // Format chat history for API call
    let chatList = chatHistory.map(item => ({
      role: item[0],
      content: item[1],
    }));

    try {
      const response = await axios.post('http://localhost:8000/chat', {
        message,
        chat_history: chatList
      });

      // Process chat history from response
      const chat_History = response.data.chat_history.map(item => [item.role, item.content]);
      
      // Update chat history in MongoDB
      const result = await users.updateOne(
        { _id: objID },
        { $set: { chatHistory: chat_History } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: response.data.response, success: true });
      } else {
        res.status(500).json({ message: "Failed to update chat history" });
      }
    } catch (error) {
      console.error("Error communicating with chat API:", error);
      res.status(500).json({ message: "Error communicating with chat API" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
