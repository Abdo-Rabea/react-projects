// next time displaying progress   (bar) question: 1/15 , points

import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScrean from "./FinishScrean";
import NextButton from "./NextButton";
import Timer from "./Timer";
import Footer from "./Footer";
const SECS_PER_QUEST = 20;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  // question: {}, // it is just derived not state
}; // loading - error - ready - active - finished
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUEST,
      };
    case "nextQuestion":
      // if (state.index < state.questions.length - 1) // redundant
      return {
        // note how these states are very closely related
        ...state,
        index: state.index + 1,
        answer: null,
      };
    // return { ...state, status: "finished" }; // no need
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          (action.payload === state.questions.at(state.index).correctOption) *
            state.questions.at(state.index).points,
      };
    case "finish":
      return {
        // i think you can make answer here equal null
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status, // note that secondsRemaining here is the old value not new
      };
    // return {
    //   ...state,
    //   status: "ready",
    //   index: 0,
    //   answer: null,
    //   points: 0,
    // };
    default:
      throw new Error("no action defined");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  // const [index, setIndex] = useState(0);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);

  // you are handling all the functionallity in the reducer so you don't have to write all these handlers
  // function handleStartQuiz() {
  //   dispatch({ type: "startQuiz" });
  //   // dispatch({ type: "nextQuestion" });
  //   // console.log('hello')
  // }

  return (
    // always have you app component nice and clean with component instance with no HTML markup between
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions.at(index)}
              // options={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
              points={points}
              index={index}
              numQuestions={numQuestions}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScrean
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
