import React, { Component } from "react";
import { Helmet } from "react-helmet";
import questions from "../questions.json";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestionIndex: 0,
      currentQuestion: {},
      prevQuestion: {},
      nextQuestion: {},
      answer: "",
      totalQuestions: 0,
      answeredQuestions: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {},
    };
  }

  componentDidMount() {
    const { questions, currentQuestion, prevQuestion, nextQuestion } =
      this.state;

    this.displayQuestions(
      questions,
      currentQuestion,
      prevQuestion,
      nextQuestion
    );
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    prevQuestion,
    nextQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (questions.length) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      prevQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({ currentQuestion, nextQuestion, prevQuestion, answer });
    }
  };

  render() {
    const { currentQuestion } = this.state;

    return (
      <>
        <Helmet>
          <title>Quiz App - Quiz</title>
        </Helmet>
        <div className="questions">
          <h1>Quiz Mode</h1>
          <div className="lifeline-container">
            <p>
              <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
              <span className="lifeline">2</span>
            </p>
            <p>
              <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
              <span className="lifeline">5</span>
            </p>
          </div>
          <div className="lifeline-container">
            <p>
              <span className="lifeline">1 of 15</span>
            </p>
            <p>
              <span className="lifeline">2:15</span>
              <span className="mdi mdi-clock-outline mdi-24px"></span>
            </p>
          </div>
          <h2>{currentQuestion.question}</h2>
          <div className="options-container">
            <p className="option">{currentQuestion.optionA}</p>
            <p className="option">{currentQuestion.optionB}</p>
          </div>
          <div className="options-container">
            <p className="option">{currentQuestion.optionC}</p>
            <p className="option">{currentQuestion.optionD}</p>
          </div>
          <div className="btn-container">
            <button type="button">Previous</button>
            <button type="button">Next</button>
            <button type="button">Quit</button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
