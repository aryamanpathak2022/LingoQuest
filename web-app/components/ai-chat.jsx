'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Send, User, Bot, ArrowLeft, Star } from 'lucide-react';

export function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Fetch chat history on component mount
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/chat/old');
        if (response.ok) {
          const history = await response.json();
          console.log(history.message);
          setMessages(history.message);
        } else {
          console.error('Failed to fetch chat history');
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchHistory();
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Send user message to the API and get AI response
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (response.ok) {
        const aiResponse = await response.json();
        setMessages(prev => [
          ...prev,
          { id: messages.length + 2, text: aiResponse.reply, sender: 'ai' }
        ]);
      } else {
        console.error('Failed to fetch AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-pixel p-4 relative overflow-hidden">
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .font-pixel {
          font-family: 'PixelFont', monospace;
        }
        .chat-container {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      
      {/* Floating pixels */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-500 opacity-50"
          initial={{ x: Math.random() * window.innerWidth, y: -10 }}
          animate={{
            y: window.innerHeight,
            x: `calc(${Math.random() * 100}vw - 10px)`,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <header className="border-b-4 border-green-500 pb-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <motion.h1
            className="text-3xl font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI Language Tutor
          </motion.h1>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl">
        <Card className="bg-gray-900 border-green-500 border-4 mb-4 relative">
          <CardContent className="p-4 chat-container h-[60vh] overflow-y-auto">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <motion.div
                      className={`w-8 h-8 rounded-none flex items-center justify-center mr-2 ${message.sender === 'user' ? 'bg-blue-500 ml-2' : 'bg-green-500'}`}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </motion.div>
                    <div
                      className={`px-4 py-2 rounded-none max-w-[70%] ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white border-2 border-blue-300' 
                          : 'bg-gray-800 text-green-400 border-2 border-green-500'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-gray-800 text-green-400 px-4 py-2 rounded-none border-2 border-green-500">
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    AI is typing...
                  </motion.span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Rotating star */}
          <motion.div
            className="absolute top-2 right-2 text-yellow-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Star size={24} />
          </motion.div>
        </Card>

        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow bg-gray-800 text-white border-2 border-green-500 rounded-none"
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-none"
            >
              <Send className="mr-2" />
              Send
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
