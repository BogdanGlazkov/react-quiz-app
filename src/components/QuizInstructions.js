import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const QuizInstructions = () => {
  return (
    <>
      <Helmet>
        <title>Quiz App - Instructions</title>
      </Helmet>
      <div className="instructions container">
        <h1>How to Play the Game</h1>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className="browser-default" id="main-list">
          <li>
            The game has a duration of 15 minutes and ends as soon as your time
            elapses.
          </li>
          <li>Each game consists of 15 questions.</li>
          <li>Every question contains 4 options.</li>
          <li>
            Select the option which best answers the question by clicking (or
            selecting) it.
          </li>
          <li>
            Each game has 2 lifelines namely:
            <ul id="sublist">
              <li>2 50-50 chances</li>
              <li>5 hints</li>
            </ul>
          </li>
          <li>
            Selecting a 50-50 lifeline by clicking the icon{" "}
            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>{" "}
            will remove 2 wrong answers, leaving the correct answer and one
            wrong answer.
          </li>
          <li>
            Using a hint by clicking the icon{" "}
            <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>{" "}
            will remove one wrong answer leaving two wrong answers and one
            correct answer. You can use as many hints as possible on a single
            question.
          </li>
          <li>
            Feel free to quit (or retire from) the game at any time. At that
            case your score will be revealed afterwards.
          </li>
          <li>The timer starts as soon as the game loads.</li>
          <li>Let's do this if you think you've got what it takes?</li>
        </ul>
        <div className="btn-container">
          <Link to="/">No, take me back</Link>
          <Link to="/play/quiz">Okay, let's do this</Link>
        </div>
      </div>
    </>
  );
};

export default QuizInstructions;
