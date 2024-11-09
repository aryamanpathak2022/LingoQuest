"use client";

import { BlogPageComponent } from "@/components/blog-page";
import { SessionProvider } from "next-auth/react";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const title = params?.title || ""; // Get 'title' from URL or default to an empty string
  const language = "English"; // Default language

  return (
    <SessionProvider>
      <div>
        <BlogPageComponent title={title} language={language} />
      </div>
    </SessionProvider>
  );
}
