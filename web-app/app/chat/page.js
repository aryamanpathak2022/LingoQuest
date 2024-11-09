"use client"
import { AiChat } from "@/components/ai-chat";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Home() {
  const session = getSession();




  return (
    <SessionProvider session={session}>
    <div>
      
      <AiChat />
    </div>
    </SessionProvider>
   
  );
}
