'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { BookOpen, MessageSquare, Trophy, Globe, Brain, Zap, User } from 'lucide-react'
import {  useEffect } from 'react'
import styles from './bg.css';

export function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('english')
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

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'japanese', label: 'Japanese' },
  ]

  const quizzes = [
    { id: 1, title: 'Beginner Vocabulary', difficulty: 'Easy' },
    { id: 2, title: 'Intermediate Grammar', difficulty: 'Medium' },
    { id: 3, title: 'Advanced Conversation', difficulty: 'Hard' },
    { id: 4, title: 'Idioms and Phrases', difficulty: 'Advance' },
  ]

  const blogs = [
    { id: 1, title: '10 Tips for Faster Language Learning', author: 'LinguaGuru' },
    { id: 2, title: 'The Benefits of Bilingualism', author: 'BrainBooster' },
    { id: 3, title: 'Immersion Techniques for Language Mastery', author: 'PolyglotPro' },
    { id: 4, title: 'The Role of Music in Language Learning', author: 'MelodicLinguist' },
    { id: 5, title: 'Overcoming Language Learning Plateaus', author: 'PersistentPolyglot' },
  ]

  const leaderboard = [
    { rank: 1, name: 'LanguageLegend', streak: 365, xp: 50000 },
    { rank: 2, name: 'WordWizard', streak: 280, xp: 45000 },
    { rank: 3, name: 'GrammarGuru', streak: 200, xp: 40000 },
    { rank: 4, name: 'VocabViking', streak: 150, xp: 35000 },
    { rank: 5, name: 'SyntaxSage', streak: 100, xp: 30000 },
  ]

  return (
    (<div className="min-h-screen bg-black text-green-500 font-pixel p-4">
      {pixels}
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .font-pixel {
          font-family: 'PixelFont', monospace;
        }
      `}</style>
      <header className="border-b-4 border-green-500 pb-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">LingoQuest</h1>
          <nav className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-none">
                <Link href="/chat" className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}>
                    <User className="mr-2" />
                  </motion.div>
                  AI Chat
                </Link>
              </Button>
            </motion.div>
            <Link href="/profile" className="text-yellow-500 hover:underline">Profile</Link>
            <Button
              asChild
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-none">
              <Link href="/logout">Logout</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto grid gap-8 max-w-7xl px-4">
        <section className="grid gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Choose Your Language</h2>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px] bg-green-500 text-black rounded-none">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Card className="bg-gray-900 border-green-500 border-2">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Globe className="mr-2" />
                Selected Language: {languages.find(l => l.value === selectedLanguage)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white">Embark on your linguistic journey in {languages.find(l => l.value === selectedLanguage)?.label}!</p>
            </CardContent>
          </Card>
        </section>

        <section>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Available Quizzes</h2>
    <Button
      asChild
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-none">
      <Link href="/quizzes">See More</Link>
    </Button>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {quizzes.map((quiz) => (
      <Card key={quiz.id} className="bg-gray-900 border-green-500 border-2">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Brain className="mr-2" />
            {quiz.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">Difficulty: {quiz.difficulty}</p>
          <Button
            asChild
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-none">
            <Link href={`/quiz/${quiz.difficulty.toLowerCase()}`}>Start Quiz</Link>
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
</section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-none">
              <Link href="/blogs">See More</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id} className="bg-gray-900 border-green-500 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BookOpen className="mr-2" />
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">By: {blog.author}</p>
                  <Button
                    asChild
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-none">
                    <Link href={`/blog/${blog.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            <Card className="bg-gray-900 border-green-500 border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Trophy className="mr-2" />
                  Top Language Learners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {leaderboard.map((user) => (
                    <li key={user.rank} className="flex justify-between items-center text-white">
                      <span>#{user.rank} {user.name}</span>
                      <span className="text-yellow-500">{user.streak} 🔥 | {user.xp} XP</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-none">
                  <Link href="/leaderboard">View Full Leaderboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-4">
              <Button
                asChild
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-none text-lg">
                <Link href="/chat" className="flex items-center justify-center">
                  <MessageSquare className="mr-2" />
                  Start AI Chat Session
                </Link>
              </Button>
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-none text-lg">
                <Link href="/daily-challenge" className="flex items-center justify-center">
                  <Zap className="mr-2" />
                  Take Daily Challenge
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-16 border-t-4 border-green-500 pt-4 text-center">
        <p>&copy; 2024 LingoQuest. All rights reserved.</p>
      </footer>
    </div>)
  );
}