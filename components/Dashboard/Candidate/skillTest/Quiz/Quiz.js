import { useEffect, useState } from "react";
import useCountdown from "./Countdown/useCountdown";
import html from "../../../../../public/html.json";
import css from "../../../../../public/css.json";
import javascript from "../../../../../public/javascript.json";
import uc from "../../../../../public/uc.json";
import { useSelector } from "react-redux";
import axios from "axios";

const Quiz = ({ technology, setState }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [questions, setQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (technology === "HTML") {
      setQuestions(html);
    } else if (technology === "CSS") {
      setQuestions(css);
    } else if (technology === "JavaScript") {
      setQuestions(javascript);
    } else if (technology === "Bootstrap") {
      setQuestions(uc);
    } else if (technology === "ReactJS") {
      setQuestions(uc);
    } else if (technology === "NextJS") {
      setQuestions(uc);
    } else if (technology === "NodeJS") {
      setQuestions(uc);
    } else {
      setQuestions(uc);
    }
  }, [technology]);

  const endTime = new Date().getTime() + 20000;
  const [timeLeft, setEndTime] = useCountdown(endTime);

  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
    setEndTime(endTime);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    saveResult(newScore);
  };

  const saveResult = (newScore) => {
    let pass = false;
    if (newScore >= 7) {
      pass = true;

      axios
        .put(
          `https://corporate-zone-backend-main.vercel.app/skill/${technology}`,
          {
            email: loggedInUser?.email,
            technology: technology,
            pass: pass,
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    setScore(newScore);
    setShowScore(true);
  };

  useEffect(() => {
    if (currentQuestion + 1 === questions?.length && seconds === 0) {
      handleSubmitButton();
    } else if (seconds === 0) {
      handleNext();
    }
  }, [seconds]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-white border-2 text-center bg-[#1A1A1A] tracking-widest rounded-3xl font-bold py-2">
          {technology} Skill Assessment Test
        </h1>
        <div className="flex bg-rose-500 text-white rounded-2xl p-3 my-2">
          <h2 className="mr-10">
            Time Duration:{" "}
            <u>
              <b>200 Seconds</b>
            </u>
          </h2>
          <h2>
            No. of Questions:{" "}
            <u>
              <b>10 MCQ</b>
            </u>
          </h2>
        </div>
      </div>
      {showScore ? (
        <div className="lg:w-1/2 bg-[#1A1A1A] text-center shadow-md rounded-xl p-5">
          <h1 className="text-3xl font-semibold text-white">
            {score >= 7
              ? `WoW, you did it. You've got ${technology} Badges...Check your profile`
              : `Didn't get any badges. Don't worry. Please try again. Good luck to you.`}
          </h1>
          <button
            onClick={() => setState(false)}
            className="text-xl my-5 p-3 font-semibold text-white/70 border-2 border-dotted border-white rounded-md hover:bg-white hover:text-black"
          >
            Start Again
          </button>
        </div>
      ) : (
        <div className="lg:w-1/2 bg-[#1A1A1A] shadow-md rounded-xl p-5">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="text-xl text-white/60">
                Question {currentQuestion + 1} of {questions?.length}
              </h4>
              <h4 className="text-white text-xl border-2 border-dotted border-white rounded-xl px-5">{`${minutes}:${seconds}`}</h4>
            </div>
            <div className="mt-4 text-2xl text-white">
              {questions[currentQuestion]?.question}
            </div>
          </div>
          <div className="flex flex-col w-full">
            {questions[currentQuestion]?.answerOptions?.map((answer, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                onClick={() => handleAnswerOption(answer?.answer)}
              >
                <input
                  type="radio"
                  name={answer?.answer}
                  value={answer?.answer}
                  checked={
                    answer?.answer ===
                    selectedOptions[currentQuestion]?.answerByUser
                  }
                  onChange={() => handleAnswerOption(answer?.answer)}
                  className="w-6 h-6 bg-black"
                />
                <p className="ml-6 text-white">{answer?.answer}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full mt-4 text-white">
            <button
              onClick={() => setState(false)}
              className="w-[49%] py-3 bg-white text-slate-700 hover:bg-pink-600 hover:text-white transition duration-700 ease-in-out hover:scale-105 rounded-xl shadow-md text-lg"
            >
              Cancel
            </button>
            <button
              onClick={
                currentQuestion + 1 === questions?.length
                  ? handleSubmitButton
                  : handleNext
              }
              className="w-[49%] py-3 bg-white text-slate-700 hover:bg-pink-600 hover:text-white transition duration-700 ease-in-out hover:scale-105 rounded-xl shadow-md text-lg"
            >
              {currentQuestion + 1 === questions?.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
