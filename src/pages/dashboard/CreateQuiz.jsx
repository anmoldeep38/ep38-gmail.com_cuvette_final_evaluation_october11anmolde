import "../../styles/CreateQuiz.css";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import deleteImage from "../../assets/deleteImage.svg";
import { createQuiz } from "../../redux/slices/QuizSlice";
function CreateQuiz({ setActiveTab, setQuizId }) {
  const dispatch = useDispatch();
  const [model, setModel] = useState(true);
  const [currentVisibleQuestion, setCurrentVisibleQuestion] = useState(0);
  const initialOption = {
    text: "",
    imageUrl: "",
    isCorrect: false,
  };

  const initialQuestion = {
    questionName: "",
    optionType: "",
    timerOption: "off",
    options: [initialOption, initialOption],
  };

  const [quiz, setQuiz] = useState({
    quizName: "",
    quizType: "",
    questions: [initialQuestion],
  });

  const [errors, setErrors] = useState({
    quizNameError: "",
    quizTypeError: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
    setErrors({ ...errors, quizNameError: "" });
  };

  const handleUserInput = (index, newName) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === index) {
        return { ...q, questionName: newName };
      }
      return q;
    });

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionTypeChange = (index, newOptionType) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === index) {
        return { ...q, optionType: newOptionType };
      }
      return q;
    });

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddOption = () => {
    const updatedQuestions = quiz.questions.map((question, index) => {
      if (index === currentVisibleQuestion && question.options.length < 4) {
        return {
          ...question,
          options: [
            ...question.options,
            { text: "", imageUrl: "", isCorrect: false },
          ],
        };
      }
      return question;
    });

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleDeleteOption = () => {
    const updatedQuestions = quiz.questions.map((question, index) => {
      if (index === currentVisibleQuestion && question.options.length > 1) {
        return { ...question, options: question.options.slice(0, -1) };
      }
      return question;
    });

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionInput = (questionIndex, optionIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = quiz.questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedOptions = question.options.map((option, oIndex) => {
          if (oIndex === optionIndex) {
            return { ...option, [name]: value };
          }
          return option;
        });
        return { ...question, options: updatedOptions };
      }
      return question;
    });

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionSelection = (questionIndex, optionIndex) => {
    const updatedQuestions = quiz.questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedOptions = question.options.map((option, oIndex) => ({
          ...option,
          isCorrect: oIndex === optionIndex,
        }));
        return { ...question, options: updatedOptions };
      }
      return question;
    });

    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: updatedQuestions,
    }));
  };

  const handleTimerOptionChange = (questionIndex, newTimerOption) => {
    const updatedQuestions = quiz.questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return { ...question, timerOption: newTimerOption };
      }
      return question;
    });

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleType = (type) => {
    setQuiz({ ...quiz, quizType: type });
    setErrors({ ...errors, quizTypeError: "" });
  };

  const handleCancel = () => {
    setActiveTab("dashboard");
  };

  const handleContinue = () => {
    if (quiz.quizName.trim() === "") {
      setErrors({ ...errors, quizNameError: "Quiz name is required." });
    } else if (quiz.quizType.trim() === "") {
      setErrors({ ...errors, quizTypeError: "Quiz type is required." });
    } else {
      setModel(false);
    }
  };

  const handleAddQuestion = () => {
    if (quiz.questions.length < 5) {
      setQuiz({
        ...quiz,
        questions: [...quiz.questions, { ...initialQuestion }],
      });
      setCurrentVisibleQuestion(quiz.questions.length);
    }
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = quiz.questions.filter(
      (_, index) => index !== questionIndex
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
    if (currentVisibleQuestion === questionIndex) {
      setCurrentVisibleQuestion(questionIndex - 1);
    }
  };

  const handleQuestionNumberClick = (index) => {
    setCurrentVisibleQuestion(index);
  };

  const renderCloseButton = (questionNumber) => {
    if (questionNumber > 1) {
      return (
        <span
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveQuestion(questionNumber - 1);
          }}
        >
          X
        </span>
      );
    }
    return null;
  };

  const validateQuiz = () => {
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];

      if (!question.questionName.trim()) {
        toast.error(`Question ${i + 1} name is required.`);
        return false;
      }

      if (!question.optionType.trim()) {
        toast.error(`Option type for Question ${i + 1} is required.`);
        return false;
      }

      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];

        if (question.optionType === "text_and_image") {
          if (!option.text.trim()) {
            toast.error(
              `Text for Option ${j + 1} in Question ${i + 1} is required.`
            );
            return false;
          }

          if (!option.imageUrl.trim()) {
            toast.error(
              `Image URL for Option ${j + 1} in Question ${i + 1} is required.`
            );
            return false;
          }
        } else {
          if (question.optionType !== "image" && !option.text.trim()) {
            toast.error(
              `Text for Option ${j + 1} in Question ${i + 1} is required.`
            );
            return false;
          }

          if (question.optionType !== "text" && !option.imageUrl.trim()) {
            toast.error(
              `Image URL for Option ${j + 1} in Question ${i + 1} is required.`
            );
            return false;
          }
        }
      }

      if (
        quiz.quizType === "Q&A" &&
        !question.options.some((opt) => opt.isCorrect)
      ) {
        toast.error(`Correct option for Question ${i + 1} is required.`);
        return false;
      }
    }

    return true;
  };

  const handleCreateQuiz = async () => {
    if (validateQuiz()) {
      const res = await dispatch(createQuiz(quiz));
      if (res.payload?.success) {
        const { _id } = res.payload.data;
        setQuizId(_id);
      }
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="model">
        <div
          className="first-model"
          style={{ display: model ? "flex" : "none" }}
        >
          <input
            type="text"
            name="quizName"
            placeholder="Quiz name"
            id="quizName"
            autoComplete="off"
            autoFocus
            value={quiz.quizName || errors.quizNameError}
            onChange={handleInputChange}
            style={{ border: errors.quizNameError ? "1px solid red" : "" }}
          />
          <div>
            <div className="quiz-type">
              <span className="type">Quiz type</span>
              <span
                className={quiz.quizType === "Q&A" ? "q activeType" : "q"}
                onClick={() => handleType("Q&A")}
                style={{ border: errors.quizTypeError ? "1px solid red" : "" }}
              >
                Q & A
              </span>
              <span
                className={quiz.quizType === "Poll" ? "q activeType" : "q"}
                onClick={() => handleType("Poll")}
                style={{ border: errors.quizTypeError ? "1px solid red" : "" }}
              >
                Poll
              </span>
            </div>
          </div>
        </div>
        <div
          className="question-container"
          style={{ display: model ? "none" : "flex" }}
        >
          <div className="header">
            <div className="numbers">
              {quiz.questions.map((question, index) => {
                return (
                  <div
                    className={`question-number ${
                      index === currentVisibleQuestion ? "active-question" : ""
                    }`}
                    key={index}
                    onClick={() => handleQuestionNumberClick(index)}
                  >
                    {index + 1} {renderCloseButton(index + 1)}
                  </div>
                );
              })}
              {quiz.questions.length < 5 && (
                <span className="plus" onClick={handleAddQuestion}>
                  +
                </span>
              )}
            </div>
            <span className="max">Max 5 Questions</span>
          </div>
          <div className="create-question">
            {quiz.questions.map((question, index) => {
              const isVisible = index === currentVisibleQuestion;
              return (
                isVisible && (
                  <div className="create-question-container" key={index}>
                    <input
                      type="text"
                      name="questionName"
                      id="questionName"
                      autoComplete="off"
                      autoFocus
                      placeholder={`${quiz.quizType} Question`}
                      value={question.questionName}
                      onChange={(e) => handleUserInput(index, e.target.value)}
                    />
                    <div className="question-type">
                      <span>Option Type</span>
                      <div className="q-types">
                        {["text", "image", "text_and_image"].map(
                          (optionType) => (
                            <div key={optionType}>
                              <input
                                type="radio"
                                name={`optionType-${index}`}
                                id={`${optionType}-${index}`}
                                checked={question.optionType === optionType}
                                onChange={() =>
                                  handleOptionTypeChange(index, optionType)
                                }
                              />
                              <label htmlFor={`${optionType}-${index}`}>
                                {optionType === "text_and_image"
                                  ? "Text & Image Url"
                                  : optionType === "text"
                                  ? "Text"
                                  : "Image Url"}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="option-timer">
                      <div className="options-type">
                        {question.options.map((option, oindex) => {
                          return (
                            <div key={oindex}>
                              {quiz.quizType === "Q&A" && (
                                <input
                                  type="radio"
                                  name={`option ${oindex}`}
                                  id={`option ${oindex}`}
                                  checked={option.isCorrect}
                                  onChange={() =>
                                    handleOptionSelection(index, oindex)
                                  }
                                />
                              )}
                              <input
                                type="text"
                                name={
                                  question.optionType === "image"
                                    ? "imageUrl"
                                    : "text"
                                }
                                autoComplete="off"
                                className={
                                  option.isCorrect
                                    ? "option correctQuestion"
                                    : "option"
                                }
                                placeholder={
                                  question.optionType === "image"
                                    ? "Image Url"
                                    : "Text"
                                }
                                value={
                                  question.optionType === "image"
                                    ? option.imageUrl
                                    : option.text
                                }
                                onChange={(e) =>
                                  handleOptionInput(index, oindex, e)
                                }
                              />
                              {question.optionType === "text_and_image" && (
                                <input
                                  type="text"
                                  name="imageUrl"
                                  id="image"
                                  placeholder="Image URL"
                                  autoComplete="off"
                                  value={option.imageUrl}
                                  onChange={(e) =>
                                    handleOptionInput(index, oindex, e)
                                  }
                                  className={
                                    option.isCorrect
                                      ? "option correctQuestion"
                                      : "option"
                                  }
                                />
                              )}
                              {question.options.length > 2 &&
                                oindex === question.options.length - 1 && (
                                  <img
                                    src={deleteImage}
                                    className="deleteIcon"
                                    alt="icon"
                                    onClick={handleDeleteOption}
                                  />
                                )}
                            </div>
                          );
                        })}
                        {question.options.length < 4 && (
                          <button
                            className="add-option"
                            onClick={handleAddOption}
                          >
                            Add Option
                          </button>
                        )}
                      </div>
                      {quiz.quizType === "Q&A" && (
                        <div className="timer">
                          <span>Timer</span>
                          {["off", "5", "10"].map((timerOption) => (
                            <span
                              key={timerOption}
                              className={`style ${
                                question.timerOption === timerOption
                                  ? "activeTimer"
                                  : ""
                              }`}
                              onClick={() =>
                                handleTimerOptionChange(index, timerOption)
                              }
                            >
                              {timerOption === "off"
                                ? "OFF"
                                : `${timerOption} sec`}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="continue"
            onClick={handleContinue}
            style={{ display: model ? "block" : "none" }}
          >
            Continue
          </button>
          <button
            className="continue"
            style={{ display: model ? "none" : "block" }}
            onClick={handleCreateQuiz}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
