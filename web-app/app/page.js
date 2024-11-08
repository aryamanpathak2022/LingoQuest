'use client'
import { SessionProvider } from "next-auth/react";
import { HomePage } from "@/components/home-pagee";

export default function Home() {
  return (
    <SessionProvider>
      <HomePage />
    </SessionProvider>
  );
}
