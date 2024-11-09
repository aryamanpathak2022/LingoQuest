'use client';
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const defaultBlogPost = {
  title: "Welcome to Lingoquest's Digital Language Adventure!",
  language: "English"
};

export function BlogPageComponent({
  title: initialTitle,
  language: initialLanguage
} = defaultBlogPost) {
  const [title, setTitle] = useState(initialTitle || defaultBlogPost.title);
  const [language, setLanguage] = useState(initialLanguage || defaultBlogPost.language);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [title, language]);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: title, language: language }),
      });
      const data = await response.json();
      setContent(data.message);
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent("Error loading content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="p-4 border-b border-green-500">
        <h1 className="text-4xl font-bold text-center">
          <span className="inline-block px-2 py-1 bg-green-500 text-black">LINGO</span>
          <span className="inline-block px-2 py-1 bg-black text-green-500 border border-green-500">QUEST</span>
        </h1>
      </header>
      {/* Main Content */}
      <main className="container mx-auto mt-8 p-4">
        <div className="bg-black p-6 rounded-lg border border-green-500 shadow-lg shadow-green-500/20">
          <h2 className="text-3xl font-bold mb-6 text-green-300">
            {title}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
          ) : (
            <ReactMarkdown className="prose prose-green prose-sm max-w-none">
              {content}
            </ReactMarkdown>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="mt-8 p-4 border-t border-green-500 text-center">
        <p className="text-sm text-green-600">
          © {new Date().getFullYear()} Lingoquest | Decode Your Language Journey
        </p>
      </footer>
      <style jsx>{`
        :global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
          color: white; /* Set Markdown headings to white */
        }
      `}</style>
    </div>
  );
}
