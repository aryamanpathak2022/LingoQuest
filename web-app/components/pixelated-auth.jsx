'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import bg.css

import styles from './bg.css';

export function PixelatedAuth() {
  const [isLogin, setIsLogin] = useState(true)
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
      className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {pixels}
      <style jsx>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
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
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md">
        <div
          className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border-4 border-green-500"
          style={{ fontFamily: 'PixelFont, monospace' }}>
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-green-500 rounded-lg relative">
                <div className="absolute inset-2 bg-black"></div>
                <div className="absolute inset-4 bg-green-500"></div>
                <div className="absolute inset-6 bg-black"></div>
                <div className="absolute inset-8 bg-green-500"></div>
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold text-center text-green-500 mb-8 pixelated">
              LingoQuest
            </h2>
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                variant={isLogin ? "default" : "outline"}
                onClick={() => setIsLogin(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-none">
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "outline"}
                onClick={() => setIsLogin(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-none">
                Sign Up
              </Button>
            </div>
            <form>
              {!isLogin && (
                <div className="mb-4">
                  <Label htmlFor="name" className="block text-sm font-medium text-green-500">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="mt-1 bg-black text-green-500 border-2 border-green-500 rounded-none" />
                </div>
              )}
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-medium text-green-500">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 bg-black text-green-500 border-2 border-green-500 rounded-none" />
              </div>
              <div className="mb-6">
                <Label htmlFor="password" className="block text-sm font-medium text-green-500">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="mt-1 bg-black text-green-500 border-2 border-green-500 rounded-none" />
              </div>
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                {isLogin ? "Start Game" : "Create Character"}
              </Button>
            </form>
            <div className="mt-6">
              <p className="text-center text-sm text-green-500">Or continue with</p>
              <div className="mt-4 flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-none border-2 border-green-500">
                  <div
                    className="w-4 h-4 bg-green-500"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)' }}></div>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-none border-2 border-green-500">
                  <div
                    className="w-4 h-4 bg-green-500"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 70%, 30% 70%, 30% 30%, 0 30%)' }}></div>
                </Button>
              </div>
            </div>
          </div>
          <div
            className="px-8 py-6 bg-gray-800 border-t-4 border-green-500 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500"></div>
              <span className="text-sm text-blue-500">10+ languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500"></div>
              <span className="text-sm text-red-500">XP Boosts</span>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 text-center">
          <div
            className="inline-block w-24 h-24 bg-yellow-500 rounded-none relative overflow-hidden">
            <div className="absolute top-4 left-4 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-8 h-4 bg-black rounded-full"></div>
          </div>
          <p className="mt-4 text-green-500 text-lg font-semibold pixelated">
            Level up your language skills!
          </p>
        </motion.div>
      </motion.div>
    </div>)
  );
}