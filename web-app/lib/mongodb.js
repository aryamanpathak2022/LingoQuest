// web-app/lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  console.error(
    "MongoDB URI is missing. Please add your MongoDB URI to .env.local"
  );
  throw new Error("Please add your MongoDB URI to .env.local");
} else {
  console.log("MongoDB URI is:", uri); // Debugging URI
}

if (process.env.NODE_ENV !== "development") {
  console.log("Running in development mode...");

  if (!global._mongoClientPromise) {
    console.log("Creating new MongoClient instance in development mode...");
    client = new MongoClient(uri, options);
    console.log("Cl11121ient connection initiated...");
    global._mongoClientPromise = client.connect();
    console.log("Client connection initiated...");
  } else {
    console.log("Using cached MongoClient connection...");
  }

  clientPromise = global._mongoClientPromise;
} else {
  console.log("Running in production mode...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("Client connection initiated in production...");
}

clientPromise
  .then(() => {
    console.log("MongoDB client connected successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default clientPromise;
