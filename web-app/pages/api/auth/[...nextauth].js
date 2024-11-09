import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
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

        return { id: user._id, email: user.email };
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
      session.user.id = token.id;
      session.user.sub = token.sub;
      session.user.email = token.email;
      session.user.rating = token.rating;
      session.user.username = token.username;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const client = await clientPromise;
        const db = client.db("lingoQuest");
        const users = await db.collection("Users");
        const userObj = await users.findOne({ _id: user.id });
        token.rating = userObj.rating;
        token.username = userObj.username;
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
});
