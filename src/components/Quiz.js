import React, { Component, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import classNames from "classnames";
import questions from "../questions.json";
import correctSound from "../assets/audio/correct-answer.mp3";
import wrongSound from "../assets/audio/wrong-answer.mp3";
import buttonSound from "../assets/audio/button-sound.mp3";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

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
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      optionsToHide: [],
      prevRandomNumbers: [],
      prevBtnDisabled: true,
      nextBtnDisabled: false,
      time: {},
    };
    this.interval = null;
    this.correctSound = createRef();
    this.wrongSound = createRef();
    this.buttonSound = createRef();
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

  componentWillUnmount() {
    clearInterval(this.interval);
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
          optionsToHide: [],
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    e.target.style.pointerEvents = "none";
    setTimeout(() => {
      e.target.style.pointerEvents = "";
    }, 2000);

    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.onCorrectAnswer();
    } else {
      this.onWrongAnswer();
    }
  };

  handleBtnClick = (e) => {
    switch (e.target.id) {
      case "next-btn":
        this.handleNextBtnClick(e);
        break;

      case "prev-btn":
        this.handlePrevBtnClick(e);
        break;

      case "quit-btn":
        this.handleQuitBtnClick(e);
        break;

      default:
        break;
    }
  };

  handleNextBtnClick = (e) => {
    if (this.state.nextQuestion) {
      e.target.disabled = true;
      this.buttonSound.current.play();
      setTimeout(() => {
        e.target.disabled = false;
      }, 1000);

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
      e.target.disabled = true;
      this.buttonSound.current.play();
      setTimeout(() => {
        e.target.disabled = false;
      }, 1000);

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
    this.buttonSound.current.play();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.navigate("/");
    }
  };

  onCorrectAnswer = () => {
    this.correctSound.current.play();
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });

    setTimeout(() => {
      this.setState(
        (prevState) => ({
          correctAnswers: prevState.correctAnswers + 1,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          if (!this.state.nextQuestion) {
            this.endGame();
          } else {
            this.displayQuestions(
              this.state.questions,
              this.state.currentQuestion,
              this.state.prevQuestion,
              this.state.nextQuestion
            );
          }
        }
      );
    }, 1500);
  };

  onWrongAnswer = () => {
    this.wrongSound.current.play();
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
        }),
        () => {
          if (!this.state.nextQuestion) {
            this.endGame();
          } else {
            this.displayQuestions(
              this.state.questions,
              this.state.currentQuestion,
              this.state.prevQuestion,
              this.state.nextQuestion
            );
          }
        }
      );
    }, 1500);
  };

  showOptions = () => {
    const options = document.querySelectorAll(".option");
    options.forEach((el) => (el.style.visibility = "visible"));
  };

  handleHints = () => {
    if (this.state.hints <= 0 || this.state.optionsToHide.length > 2) return;
    const options = document.querySelectorAll(".option");
    const hintBtn = document.querySelectorAll(".hint span");
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
        !this.state.prevRandomNumbers.includes(randomNumber) &&
        !this.state.optionsToHide.includes(randomNumber)
      ) {
        options.forEach((el, idx) => {
          if (idx === randomNumber) {
            el.style.visibility = "hidden";

            if (this.state.hints < 2) {
              hintBtn.forEach((el) => {
                el.style.color = "gray";
                el.style.pointerEvents = "none";
              });
            }

            this.setState((prevState) => ({
              hints: prevState.hints - 1,
              prevRandomNumbers:
                prevState.prevRandomNumbers.concat(randomNumber),
              optionsToHide: prevState.optionsToHide.concat(randomNumber),
            }));
          }
        });
        break;
      }
      if (this.state.prevRandomNumbers.length >= 3) break;
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty <= 0 || this.state.optionsToHide.length > 1)
      return;

    const options = document.querySelectorAll(".option");
    const fiftyFiftyBtn = document.querySelectorAll(".fiftyFifty span");
    const randomNumbers = [];
    let answerIndex;

    options.forEach((el, idx) => {
      if (el.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        answerIndex = idx;
      }
    });

    let count = 0;
    let hiddenArr = [];
    do {
      const randomNumber = Math.round(Math.random() * 3);
      if (randomNumber === answerIndex) {
        continue;
      } else if (
        randomNumbers.length < 2 &&
        !randomNumbers.includes(randomNumber) &&
        !this.state.optionsToHide.includes(randomNumber)
      ) {
        randomNumbers.push(randomNumber);
        count++;
      }
    } while (count < 2);

    options.forEach((el, idx) => {
      if (randomNumbers.includes(idx)) {
        hiddenArr.push(idx);
        el.style.visibility = "hidden";
      }
    });

    if (this.state.fiftyFifty <= 1) {
      fiftyFiftyBtn.forEach((el) => {
        el.style.color = "gray";
        el.style.pointerEvents = "none";
      });
    }

    this.setState((prevState) => ({
      fiftyFifty: prevState.fiftyFifty - 1,
      optionsToHide: prevState.optionsToHide.concat(hiddenArr),
    }));
  };

  startTimer = () => {
    const countDownTime = Date.now() + 302000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

      if (distance <= 60000) {
        const timer = document.getElementById("timer");
        timer.style.color = "red";
      }

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: "0",
              seconds: "00",
            },
          },
          () => {
            this.endGame();
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

  endGame = () => {
    alert("Quiz has ended!");
    const { totalQuestions, correctAnswers, wrongAnswers, fiftyFifty, hints } =
      this.state;
    const playerStats = {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      fiftyFiftyUsed: 2 - fiftyFifty,
      hintsUsed: 5 - hints,
    };
    setTimeout(() => {
      this.props.navigate("/play/summary", { state: playerStats });
    }, 1000);
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
          <audio ref={this.correctSound} src={correctSound}></audio>
          <audio ref={this.wrongSound} src={wrongSound}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </>
        <div className="questions">
          <h1>Quiz Mode</h1>
          <div className="lifeline-container">
            <p className="fiftyFifty">
              <span
                className="mdi mdi-set-center mdi-24px lifeline-icon"
                onClick={this.handleFiftyFifty}
                title="Use 50-50"
              >
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p className="hint">
              <span
                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
                onClick={this.handleHints}
                title="Use a hint"
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
              <span id="timer" className="lifeline">
                {time.minutes}:{time.seconds}
              </span>
              <span className="mdi mdi-clock-outline mdi-24px"></span>
            </p>
          </div>
          <h2>{currentQuestion.question}</h2>
          <div className="options">
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

export default withNavigation(Quiz);
