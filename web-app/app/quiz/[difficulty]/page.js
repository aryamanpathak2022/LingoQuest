"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QuizPage } from "@/components/quiz-page";
import { SessionProvider, getSession } from "next-auth/react";

export default function QuizPageWrapper({ language = 'English', params }) {
    const [difficulty, setDifficulty] = useState('easy');
    const [resolvedParams, setResolvedParams] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        const fetchParams = async () => {
            const resolved = await params;
            setResolvedParams(resolved);
            setDifficulty(resolved.difficulty);
        };

        fetchSession();
        fetchParams();
    }, [params]);

    if (!resolvedParams) {
        return <div>Loading...</div>;
    }

    return (
        <SessionProvider session={session}>
            <QuizPage
                language={language}
                difficulty={difficulty}
            />
        </SessionProvider>
    );
}
