import '../../styles/QuestionAnalytics.css'

import React from 'react'
import { useLocation } from 'react-router-dom'

import ViewQuestion from '../../components/ViewQuestion'

function QuestionAnalytics() {
    const { state } = useLocation()
    const quiz = state?.quizData

    const formatCreatedAt = (createdAt) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(createdAt).toLocaleString('en-IN', options);
    }

    return (
        <div className='question-analysis'>
            <div className="quiz-details">
                <h1>{quiz?.quizName} Question Analysis</h1>
                <div>
                    <span>Created on : {formatCreatedAt(quiz?.createdAt)}</span>
                    <span>Impressions: {quiz?.views}</span>
                </div>
            </div>
            <div className='questions-details'>
                {quiz?.questions?.map((question, index) => (
                    <React.Fragment key={index}>
                        <ViewQuestion
                            questionNumber={index + 1}
                            questionName={question?.questionName}
                            quizType={quiz?.quizType}
                            options={question?.options}
                            totalAttempts={question?.totalAttempts}
                            totalCorrectAttempts={question?.totalCorrectAttempts}
                            totalIncorrectAttempts={question?.totalIncorrectAttempts}
                        />
                        {index !== quiz?.questions?.length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default QuestionAnalytics
