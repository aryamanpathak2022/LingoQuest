"use client"
import { UserDashboard } from "@/hooks/user-dashboard";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <div>
      <UserDashboard />
      </div>
    </SessionProvider>
  );
}

