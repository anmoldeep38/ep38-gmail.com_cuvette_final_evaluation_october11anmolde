function ViewQuestion({ questionNumber, questionName, quizType, options, totalAttempts, totalCorrectAttempts, totalIncorrectAttempts }) {

    return (
        <div className="view-question">
            <h1>Q.{questionNumber} {questionName}</h1>
            <div className="options">
                {quizType === 'Poll' ? (
                    options.map((option, index) => (
                        <div key={index}>
                            <p>{option.totalAttempts}</p>
                            <span>Option {index + 1}</span>
                        </div>
                    ))
                ) : (<>
                    <div className="qna-option">
                        <p>{totalAttempts}</p>
                        <span>people Attempted the question</span>
                    </div>
                    <div className="qna-option">
                        <p>{totalCorrectAttempts}</p>
                        <span>people Answered Correctly</span>
                    </div>
                    <div className="qna-option">
                        <p>{totalIncorrectAttempts}</p>
                        <span>people Answered Incorrectly</span>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default ViewQuestion
