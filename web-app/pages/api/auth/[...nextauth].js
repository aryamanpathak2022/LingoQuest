import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const client = await clientPromise;
        const db = client.db("lingoQuest");
        const usersCollection = db.collection("Users");

        // Find the user by email
        const user = await usersCollection.findOne({ email: credentials.email });

        // If user doesn't exist or password is incorrect, return null
        if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash))) {
          return null;
        }

        return { id: user._id.toString(), email: user.email }; // Ensure `id` is a string
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth",  // Custom sign-in page
    signOut: "/",
    error: "/auth",  // Error code passed in query string as ?error=
  },
  callbacks: {
    async session({ session, token }) {
      // Add properties from token to session for easier access in other APIs
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.rating = token.rating;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        
        // Fetch user data from database to add to token
        const client = await clientPromise;
        const db = client.db("lingoQuest");
        const usersCollection = db.collection("Users");
        const userObj = await usersCollection.findOne({ _id: new ObjectId(user.id) });
        
        if (userObj) {
          token.rating = userObj.rating;
          token.username = userObj.username;
        }
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      if (user) {
        // If sign-in is successful, redirect to /dashboard
        return { redirectUrl: '/dashboard' };
      }
    },
  },
};

export default NextAuth(authOptions);
