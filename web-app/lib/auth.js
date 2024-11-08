// web-app/lib/auth.js

import bcrypt from "bcryptjs";
import clientPromise from "./mongodb";

export async function verifyUser(email, password) {
  const client = await clientPromise;
  const db = client.db("lingoQuest");
  const usersCollection = db.collection("Users");

  // Find user by email
  const user = await usersCollection.findOne({ email });

  if (!user) {
    return null;
  }

  // Compare provided password with stored hashed password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (isValidPassword) {
    return { id: user._id, email: user.email };
  } else {
    return null;
  }
}