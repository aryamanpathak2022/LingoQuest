import { QuizPage } from "@/components/quiz-page";


export default function QizPage({ language = 'English', difficulty = 'easy' }) {
    return <QuizPage
    language={language}
    difficulty={difficulty}
     />;
    }
    
    