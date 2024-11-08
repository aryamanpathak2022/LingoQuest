'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

export default function Component() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [quizData, setQuizData] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    generateQuizData(selectedYear)
  }, [selectedYear])

  const generateQuizData = (year) => {
    const endDate = new Date(year, 11, 31)
    const startDate = new Date(year, 0, 1)
    const data = []
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      data.push({
        date: new Date(d),
        count: Math.floor(Math.random() * 5)
      })
    }
    setQuizData(data)
  }

  const renderQuizGrid = () => {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(14px,1fr))] gap-1 border-l-4 border-green-500 pl-2">
        {quizData.map((day, index) => (
          <div
            key={index}
            className={`w-3 h-3 ${
              day.count === 0 ? 'bg-gray-800' :
              day.count === 1 ? 'bg-green-900' :
              day.count === 2 ? 'bg-green-700' :
              day.count === 3 ? 'bg-green-500' :
              'bg-green-300'
            }`}
            title={`${day.count} quizzes on ${day.date.toDateString()}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-pixel">
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .font-pixel {
          font-family: 'PixelFont', monospace;
        }
      `}</style>

      {/* Header */}
      <header className="p-4 border-b-4 border-green-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">LingoQuest</div>
          <nav className="flex items-center space-x-4">
            <span className="text-yellow-500">Welcome, Player1</span>
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-none">
              <Link href="/logout">Logout</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto mt-8 flex">
        {/* Main Content */}
        <main className="flex-grow pr-8">
          {/* User Info and Character */}
          <div className="flex items-start mb-8">
            <div className="mr-8">
              <div className="w-32 h-32 bg-green-500 relative overflow-hidden">
                {/* Pixel Art Character */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-black"></div>
                <div className="absolute top-12 left-12 w-8 h-8 bg-yellow-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-12 bg-blue-500"></div>
                <div className="absolute bottom-4 right-4 w-8 h-12 bg-blue-500"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Player1</h1>
              <p className="text-yellow-500 mb-2">Level 15 Language Adventurer</p>
              <div className="flex space-x-2">
                <span className="bg-blue-500 text-white px-2 py-1 text-xs">Beginner: Spanish</span>
                <span className="bg-green-500 text-white px-2 py-1 text-xs">Intermediate: French</span>
                <span className="bg-red-500 text-white px-2 py-1 text-xs">Advanced: English</span>
              </div>
            </div>
          </div>

          {/* Streak Info */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Current Streak</h2>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-yellow-500 mr-4">{currentStreak}</div>
              <div className="text-green-300">days</div>
              <div className="ml-4 text-xs">
                {Array.from({ length: 7 }).map((_, index) => (
                  <span
                    key={index}
                    className={`inline-block w-4 h-4 mr-1 ${
                      index < currentStreak ? 'bg-yellow-500' : 'bg-gray-700'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz Activity Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Quiz Activity</h2>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-[180px] bg-green-500 text-black rounded-none">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(5)].map((_, i) => (
                    <SelectItem key={i} value={(new Date().getFullYear() - i).toString()}>
                      {new Date().getFullYear() - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {renderQuizGrid()}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-64 border-l-4 border-green-500 pl-8">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <ul className="space-y-2">
            <li>Total XP: 15,420</li>
            <li>Quizzes Completed: 387</li>
            <li>Longest Streak: 30 days</li>
            <li>Languages: 3</li>
          </ul>
          <h2 className="text-xl font-bold mt-8 mb-4">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-none">
                <Link href="/daily-challenge">Daily Challenge</Link>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-none">
                <Link href="/practice">Practice</Link>
              </Button>
            </li>
            <li>
              <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-none">
                <Link href="/leaderboard">Leaderboard</Link>
              </Button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}