'use client'

import { PixelatedAuth } from "@/components/pixelated-auth";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <SessionProvider>
      <div>
        <PixelatedAuth />
      </div>
    </SessionProvider>
  );
}
