'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Zap, BookOpen, Flame, Star, BarChart } from 'lucide-react'
import styles from './dashboard.css'

export function UserDashboard() {
  // This would typically come from a database or API
  const user = {
    username: "PixelMaster42",
    level: 7,
    xp: 3450,
    streak: 5
  }

  return (
    (<div
      className="min-h-screen bg-black text-white font-pixel p-4 relative overflow-hidden">
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .font-pixel {
          font-family: 'PixelFont', monospace;
        }
        .pixel-border {
          box-shadow: 0 0 0 2px #fff,
                      0 0 0 4px #000,
                      0 0 0 6px #fff,
                      0 0 0 8px #000;
        }
        .pixelated-text {
          text-shadow: 
            2px 2px 0 #ff00ff,
            -2px -2px 0 #00ffff,
            2px -2px 0 #ffff00,
            -2px 2px 0 #00ff00;
        }
        .pixel-bg {
          background-image: linear-gradient(45deg, #000 25%, transparent 25%),
                            linear-gradient(-45deg, #000 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #000 75%),
                            linear-gradient(-45deg, transparent 75%, #000 75%);
          background-size: 4px 4px;
          background-position: 0 0, 0 2px, 2px -2px, -2px 0px;
        }
      `}</style>
      <div
        className="container mx-auto max-w-6xl h-screen flex flex-col justify-between py-8">
        <header className="text-center mb-8">
          <motion.h1
            className="text-20xl font-bold mb-4 inline-block pixelated-text" // Increased font size
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}>
            LingoQuest Dashboard
          </motion.h1>
        </header>

        <Card
          className="bg-gray-900 border-2 border-green-500 pixel-border mb-8 pixel-bg">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-green-400 pixelated-text">Welcome, {user.username}!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500 p-6 rounded-lg pixel-border">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <p className="text-2xl font-bold">Level {user.level}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-500 p-6 rounded-lg pixel-border">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <p className="text-2xl font-bold">{user.xp} XP</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-red-500 p-6 rounded-lg pixel-border">
                <Flame className="w-12 h-12 mx-auto mb-4" />
                <p className="text-2xl font-bold">{user.streak} Day Streak</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-1/3 lg:w-1/4">
            <Button
              className="w-full h-32 text-2xl font-bold bg-green-500 hover:bg-green-600 rounded-lg pixel-border pixel-bg">
              <Zap className="w-10 h-10 mr-4" />
              Daily Challenge
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-1/3 lg:w-1/4">
            <Button
              className="w-full h-32 text-2xl font-bold bg-blue-500 hover:bg-blue-600 rounded-lg pixel-border pixel-bg">
              <BookOpen className="w-10 h-10 mr-4" />
              Practice
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-1/3 lg:w-1/4">
            <Button
              className="w-full h-32 text-2xl font-bold bg-yellow-500 hover:bg-yellow-600 rounded-lg pixel-border pixel-bg">
              <BarChart className="w-10 h-10 mr-4" />
              Leaderboard
            </Button>
          </motion.div>
        </div>

        <footer
          className="text-center text-gray-500 pixel-bg p-4 rounded-lg pixel-border">
          <p>&copy; 2024 LingoQuest. All rights reserved.</p>
        </footer>
      </div>
    </div>)
  );
}
