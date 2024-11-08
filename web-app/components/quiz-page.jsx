'use client';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Star, ArrowRight } from 'lucide-react'

const questions = [
  {
    id: 1,
    text: "What is the Spanish word for 'hello'?",
    options: ["Hola", "Adiós", "Gracias", "Por favor"],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "Which language uses the Cyrillic alphabet?",
    options: ["Greek", "Arabic", "Russian", "Hindi"],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "What does 'Auf Wiedersehen' mean in German?",
    options: ["Good morning", "Thank you", "Goodbye", "Please"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "In Japanese, what is the meaning of 'Konnichiwa'?",
    options: ["Good night", "Hello", "Thank you", "Excuse me"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "Which language is the most widely spoken in the world?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: 2
  }
]

export function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)

    setTimeout(() => {
      if (correct) {
        setScore(score + 10)
      } else {
        setLives(lives - 1)
      }

      if (lives === 1 && !correct) {
        setGameOver(true)
      } else {
        setCurrentQuestion((prev) => (prev + 1) % questions.length)
        setSelectedAnswer(null)
        setIsCorrect(null)
      }
    }, 1000)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white font-pixel p-4 relative overflow-hidden">
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .font-pixel {
          font-family: 'PixelFont', monospace;
        }
        .pixel-border {
          box-shadow: 0 0 0 3px #fff,
                      0 0 0 6px #000,
                      0 0 0 9px #fff,
                      0 0 0 12px #000;
        }
        .pixelated-text {
          text-shadow: 
            2px 2px 0 #ff00ff,
            -2px -2px 0 #00ffff,
            2px -2px 0 #ffff00,
            -2px 2px 0 #00ff00;
        }
      `}</style>
      {/* Pixelated background */}
      <div
        className="fixed inset-0 grid grid-cols-16 grid-rows-16 gap-1 opacity-10 z-0">
        {[...Array(256)].map((_, i) => (
          <div
            key={i}
            className={`${['bg-pink-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'][Math.floor(Math.random() * 5)]}`}></div>
        ))}
      </div>
      <div className="container mx-auto max-w-2xl relative z-10">
        <header className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-4 pixel-border p-2 inline-block pixelated-text">
            LingoQuest Quiz
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${i < lives ? 'text-red-500' : 'text-gray-500'}`}
                  fill={i < lives ? 'red' : 'gray'} />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" fill="yellow" />
              <span className="text-xl font-bold text-yellow-500">{score}</span>
            </div>
          </div>
        </header>

        {!gameOver ? (
          <Card className="bg-gray-900 border-4 border-green-500 pixel-border">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-400">Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl mb-6 text-center text-white">{questions[currentQuestion].text}</p>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`text-lg py-3 px-6 rounded-none transition-colors duration-300 ${
                      selectedAnswer === index
                        ? isCorrect
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}>
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card
            className="bg-gray-900 border-4 border-green-500 pixel-border text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-green-400">Game Over!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl mb-4">Your final score: {score}</p>
              <Button
                onClick={resetGame}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-none">
                Play Again <ArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>)
  );
}