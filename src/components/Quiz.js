import React, { Component } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import questions from "../questions.json";
import correctSound from "../assets/audio/correct-answer.mp3";
import wrongSound from "../assets/audio/wrong-answer.mp3";
import buttonSound from "../assets/audio/button-sound.mp3";

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

      this.setState({
        currentQuestion,
        nextQuestion,
        prevQuestion,
        answer,
        totalQuestions: questions.length,
      });
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.onCorrectAnswer();
    } else {
      this.onWrongAnswer();
    }
  };

  handleButtonClick = () => {
    setTimeout(() => {
      document.getElementById("button-sound").play();
    }, 500);
  };

  onCorrectAnswer = () => {
    document.getElementById("correct-sound").play();
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });

    setTimeout(() => {
      this.setState(
        (prevState) => ({
          score: prevState.score + 1,
          correctAnswers: prevState.correctAnswers + 1,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          answeredQuestions: prevState.answeredQuestions + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.prevQuestion,
            this.state.nextQuestion
          );
        }
      );
    }, 1500);
  };

  onWrongAnswer = () => {
    document.getElementById("wrong-sound").play();
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });

    setTimeout(() => {
      this.setState(
        (prevState) => ({
          wrongAnswers: prevState.wrongAnswers + 1,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          answeredQuestions: prevState.answeredQuestions + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.prevQuestion,
            this.state.nextQuestion
          );
        }
      );
    }, 1500);
  };

  render() {
    const { currentQuestion, currentQuestionIndex, totalQuestions } =
      this.state;

    return (
      <>
        <Helmet>
          <title>Quiz App - Quiz</title>
        </Helmet>
        <>
          <audio id="correct-sound" src={correctSound}></audio>
          <audio id="wrong-sound" src={wrongSound}></audio>
          <audio id="button-sound" src={buttonSound}></audio>
        </>
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
              <span className="lifeline">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </p>
            <p>
              <span className="lifeline">2:15</span>
              <span className="mdi mdi-clock-outline mdi-24px"></span>
            </p>
          </div>
          <h2>{currentQuestion.question}</h2>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="btn-container">
            <button type="button" onClick={this.handleButtonClick}>
              Previous
            </button>
            <button type="button" onClick={this.handleButtonClick}>
              Next
            </button>
            <button type="button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
