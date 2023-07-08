import React, { Component } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import classNames from "classnames";
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
      prevRandomNumbers: [],
      prevBtnDisabled: true,
      nextBtnDisabled: false,
      time: {},
    };
    this.interval = null;
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
    this.startTimer();
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

      this.setState(
        {
          currentQuestion,
          nextQuestion,
          prevQuestion,
          answer,
          totalQuestions: questions.length,
          prevRandomNumbers: [],
          usedFiftyFifty: false,
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.onCorrectAnswer();
    } else {
      this.onWrongAnswer();
    }
  };

  handleBtnClick = (e) => {
    switch (e.target.id) {
      case "next-btn":
        this.handleNextBtnClick();
        break;

      case "prev-btn":
        this.handlePrevBtnClick();
        break;

      case "quit-btn":
        this.handleQuitBtnClick();
        break;

      default:
        break;
    }
  };

  handleNextBtnClick = (e) => {
    if (this.state.nextQuestion) {
      document.getElementById("button-sound").play();
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
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
    }
  };

  handlePrevBtnClick = (e) => {
    if (this.state.prevQuestion) {
      document.getElementById("button-sound").play();
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
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
    }
  };

  handleQuitBtnClick = (e) => {
    document.getElementById("button-sound").play();
    if (window.confirm("Are you sure you want to quit?")) {
      window.location.replace("/");
    }
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

  showOptions = () => {
    const options = document.querySelectorAll(".option");
    options.forEach((el) => (el.style.visibility = "visible"));
  };

  handleHints = () => {
    if (this.state.hints <= 0) return;
    const options = document.querySelectorAll(".option");
    let answerIndex;

    options.forEach((el, idx) => {
      if (el.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        answerIndex = idx;
      }
    });

    while (true) {
      const randomNumber = Math.round(Math.random() * 3);
      if (
        randomNumber !== answerIndex &&
        !this.state.prevRandomNumbers.includes(randomNumber)
      ) {
        options.forEach((el, idx) => {
          if (idx === randomNumber) {
            el.style.visibility = "hidden";
            this.setState((prevState) => ({
              hints: prevState.hints - 1,
              prevRandomNumbers:
                prevState.prevRandomNumbers.concat(randomNumber),
            }));
          }
        });
        break;
      }
      if (this.state.prevRandomNumbers.length >= 3) break;
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty <= 0 || this.state.usedFiftyFifty) return;
    const options = document.querySelectorAll(".option");
    const randomNumbers = [];
    let answerIndex;

    options.forEach((el, idx) => {
      if (el.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        answerIndex = idx;
      }
    });

    let count = 0;
    do {
      const randomNumber = Math.round(Math.random() * 3);
      if (randomNumber !== answerIndex) {
        if (
          randomNumbers.length < 2 &&
          !randomNumbers.includes(randomNumber) &&
          !randomNumbers.includes(answerIndex)
        ) {
          randomNumbers.push(randomNumber);
          count++;
        } else {
          while (true) {
            const newRandomNumber = Math.round(Math.random() * 3);
            if (
              !randomNumbers.includes(newRandomNumber) &&
              !randomNumbers.includes(answerIndex)
            ) {
              randomNumbers.push(newRandomNumber);
              count++;
              break;
            }
          }
        }
      }
    } while (count < 2);
    options.forEach((el, idx) => {
      if (randomNumbers.includes(idx)) {
        el.style.visibility = "hidden";
      }
    });
    this.setState((prevState) => ({
      fiftyFifty: prevState.fiftyFifty - 1,
      usedFiftyFifty: true,
    }));
  };

  startTimer = () => {
    const countDownTime = Date.now() + 300000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            alert("Quiz has ended");
            window.location.replace("/");
          }
        );
      } else {
        this.setState(() => ({
          time: { minutes, seconds },
        }));
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (!this.state.prevQuestion || this.state.currentQuestionIndex === 0) {
      this.setState({ prevBtnDisabled: true });
    } else {
      this.setState({ prevBtnDisabled: false });
    }

    if (
      !this.state.nextQuestion ||
      this.state.currentQuestionIndex === this.state.totalQuestions - 1
    ) {
      this.setState({ nextBtnDisabled: true });
    } else {
      this.setState({ nextBtnDisabled: false });
    }
  };

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      totalQuestions,
      hints,
      fiftyFifty,
      prevBtnDisabled,
      nextBtnDisabled,
      time,
    } = this.state;

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
              <span
                className="mdi mdi-set-center mdi-24px lifeline-icon"
                onClick={this.handleFiftyFifty}
              >
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span
                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
                onClick={this.handleHints}
              >
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div className="lifeline-container">
            <p>
              <span className="lifeline">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </p>
            <p>
              <span className="lifeline">
                {time.minutes}:{time.seconds}
              </span>
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
            <button
              className={classNames("", { disable: prevBtnDisabled })}
              id="prev-btn"
              type="button"
              onClick={this.handleBtnClick}
            >
              Previous
            </button>
            <button
              className={classNames("", { disable: nextBtnDisabled })}
              id="next-btn"
              type="button"
              onClick={this.handleBtnClick}
            >
              Next
            </button>
            <button id="quit-btn" type="button" onClick={this.handleBtnClick}>
              Quit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
