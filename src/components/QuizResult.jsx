import '../styles/QuizResult.css'

import Confetti from 'react-confetti'

import trophy from '../assets/trophy.png'

function QuizResult({ quizType, myScore, totalScore }) {

    return (
        <div className='result-container'>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className='result'>
                {
                    quizType === 'Q&A' ? (
                        <>
                            <div  className='hel'>
                            <h1>Congrats Quiz is completed</h1>
                            </div>
                            <div className='img'>
                            <img src={trophy} alt="trophy" />
                            </div>
                            <div className='last-design'>
                            <h1>Your Score is <span className='score'>0{myScore} / 0{totalScore}</span></h1>
                            </div>
                        </>
                    ) : (
                        <h1 className='poll-result'>Thank you <br /> for participating  <br /> in the Poll</h1>
                    )
                }
            </div>
        </div>
    )
}

export default QuizResult
