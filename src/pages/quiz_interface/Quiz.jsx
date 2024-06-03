import "../../styles/Quiz.css";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import QuizResult from "../../components/QuizResult";
import {
  attemptPollQuiz,
  attemptQNAQuiz,
  getQuiz,
} from "../../redux/slices/QuizSlice";

function Quiz() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const quiz = useSelector((state) => state.quizSlice.quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [myScore, setMyScore] = useState(0);
  const [data, setData] = useState({
    _id: quizId,
    answers: [],
  });
  const timerRef = useRef();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await dispatch(getQuiz(quizId));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (quiz?.questions) {
      setData((data) => ({
        ...data,
        answers: Array(quiz.questions.length).fill(null),
      }));
    }
  }, [quiz?.questions]);

  useEffect(() => {
    const question = quiz?.questions?.[currentQuestionIndex];
    if (question?.timerOption && question.timerOption !== "off") {
      setTimer(question.timerOption);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quiz?.questions, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz?.totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    let res;
    if (quiz?.quizType === "Q&A") {
      res = await dispatch(attemptQNAQuiz(data));
      setMyScore(res?.payload?.data);
    } else {
      res = await dispatch(attemptPollQuiz(data));
    }
    setQuizCompleted(true);
  };

  const handleOptionClick = (index) => {
    if (
      quiz?.quizType === "Poll" ||
      currentQuestion?.timerOption === "off" ||
      timer > 0
    ) {
      const updatedAnswers = [...data.answers];
      updatedAnswers[currentQuestionIndex] = index;
      setData((data) => ({ ...data, answers: updatedAnswers }));
    }
  };

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  if (quizCompleted) {
    return (
      <QuizResult
        quizType={quiz?.quizType}
        myScore={myScore}
        totalScore={quiz?.totalQuestions}
      />
    );
  }

  return (
    <div className="quiz-container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="quiz-questions">
          <div className="question-header">
            <span className="questionIndex">
              0{currentQuestionIndex + 1} / 0{quiz?.totalQuestions}
            </span>
            {currentQuestion?.timerOption !== "off" &&
              quiz?.quizType !== "Poll" && (
                <span className="question-timer">
                  00:{timer?.toString()?.padStart(2, "0")}s
                </span>
              )}
          </div>
          <div className="question-details">
            <h1 className="question-text">{currentQuestion?.questionName}</h1>
            <div className="question-options">
              {currentQuestion?.options?.map((option, index) => {
                return (
                  <div
                    key={option._id}
                    className={`question-option ${
                      data.answers[currentQuestionIndex] === index
                        ? "selected-option"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    {currentQuestion?.optionType === "text" && (
                      <span>{option?.text}</span>
                    )}
                    {currentQuestion?.optionType === "image" &&
                      option?.imageUrl && (
                        <img src={option?.imageUrl} alt={option?.text} />
                      )}
                    {currentQuestion?.optionType === "text_and_image" && (
                      <>
                        <span>{option?.text}</span>
                        {option?.imageUrl && (
                          <img src={option?.imageUrl} alt={option?.text} />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="navigation-buttons">
            {currentQuestionIndex === quiz?.questions?.length - 1 ? (
              <button onClick={handleSubmitQuiz}>Submit</button>
            ) : (
              <button onClick={handleNextQuestion}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
