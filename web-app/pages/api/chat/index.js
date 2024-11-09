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
  if (req.method === "POST") {
    const message = req.body.message;
    let chatHistory = user.chatHistory;
    let chatList = []; 
    chatHistory.forEach(item => {
        chatList.push({"role":"user","content":item});
    });

    // console.log(chatList,message);

    try {
        const response = await axios.post('http://localhost:8000/chat', {
          message,
          chat_history: chatList
        });

        chatHistory.push(response.data.response);

        const result = await users.updateOne(
            { _id: objID },
              { $set: { chatHistory: chatHistory } }
          );
      
          console.log(result);
      
          if(result.modifiedCount === 1)
          {
            res.status(200).json({ message: "Chat History Updated" });
          }
          else
          {
            res.status(500).json({ message: "Internal Server Error" });
          }

      } catch (error) {
        console.error("Error communicating with chat API:", error);
        return null;
      }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
