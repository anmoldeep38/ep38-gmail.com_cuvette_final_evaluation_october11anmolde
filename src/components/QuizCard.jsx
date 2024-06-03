import eyeImage from '../assets/eyeImage.svg'

function QuizCard({ quizName, views, createdAt }) {
    return (
        <div className="quiz-card">
            <div>
                <span className="quiz-name">{quizName}</span>
                <span className="views">
                    {views}
                    <img src={eyeImage} alt="icon" />
                </span>
            </div>
            <p>Created on : {createdAt}</p>
        </div>
    )
}

export default QuizCard
