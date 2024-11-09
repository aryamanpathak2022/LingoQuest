"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QuizPage } from "@/components/quiz-page";
import { SessionProvider } from "next-auth/react";
import { session } from "next-auth/react";

export default function QuizPageWrapper({ language = 'English', params }) {
    const [difficulty, setDifficulty] = useState('easy'); // Default to 'easy'

    useEffect(() => {
        
            setDifficulty(params.difficulty); // Fetch the difficulty from dynamic route
        
    }, [params.difficulty]);

    return (

        <SessionProvider session={session}>
       
        <QuizPage
            language={language}
            difficulty={difficulty}
        />
        </SessionProvider>
    );
}
