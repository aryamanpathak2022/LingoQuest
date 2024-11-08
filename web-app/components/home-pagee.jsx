'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import styles from './bg.css';
import { signIn, signOut, useSession } from 'next-auth/react';


export function HomePage() {
  const [pixels, setPixels] = useState([])

  useEffect(() => {
    const newPixels = []
    for (let i = 0; i < 100; i++) {
      newPixels.push(<div
        key={i}
        className="pixel"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }} />)
    }
    setPixels(newPixels)
  }, [])

  return (
    (<div
      className="min-h-screen bg-black text-green-500 font-pixel relative overflow-hidden">
      {pixels}
      <style jsx>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .font-pixel {
          font-family: 'PixelFont', monospace;
        }
        .pixel {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #00ff00;
          opacity: 0.5;
          animation: float 5s infinite ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      {/* Header */}
      <header className="p-4 border-b-4 border-green-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">LingoQuest</div>
          <nav>
            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-none" onClick={() => signIn()}>
              <Link href="/login">Login / Signup</Link>
            </Button>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}>
          Level Up Your Language Skills
        </motion.h1>
        <motion.p
          className="text-xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Embark on a linguistic adventure with LingoQuest!
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-600 text-black text-xl font-bold py-3 px-6 rounded-none">
            <Link href="/signup">Start Your Quest</Link>
          </Button>
        </motion.div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Game Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Streak System", icon: "🔥", description: "Keep your learning streak alive and earn bonus XP!" },
              { title: "Problem of the Day", icon: "📅", description: "Daily challenges to test your skills" },
              { title: "Quiz Leaderboard", icon: "🏆", description: "Compete with other language learners" },
              { title: "AI Chatting", icon: "🤖", description: "Practice conversations with our AI language partner" },
              { title: "Blogging System", icon: "✍️", description: "Share your language learning journey" },
              { title: "AI Speech Feedback", icon: "🎙️", description: "Get instant pronunciation feedback" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-none border-4 border-green-500"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Language Quest?</h2>
        <Button
          asChild
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-xl font-bold py-3 px-6 rounded-none">
          <Link href="/signup">Join Now</Link>
        </Button>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-green-500 py-8 border-t-4 border-green-500">
        <div
          className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">LingoQuest</h3>
            <p>© 2024 LingoQuest. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="hover:text-yellow-500">About</Link>
            <Link href="/contact" className="hover:text-yellow-500">Contact</Link>
            <Link href="/privacy" className="hover:text-yellow-500">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-500">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>)
  );
}