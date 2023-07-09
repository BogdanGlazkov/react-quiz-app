import React, { Component } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const withLocation = (Component) => {
  return (props) => <Component {...props} location={useLocation()} />;
};

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      totalQuestions: 0,
      answeredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      fiftyFiftyUsed: 0,
      hintsUsed: 0,
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (!state) return;

    this.setState({
      score: (state.correctAnswers / state.totalQuestions) * 100,
      totalQuestions: state.totalQuestions,
      answeredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: state.fiftyFiftyUsed,
      hintsUsed: state.hintsUsed,
    });
  }

  render() {
    const { state } = this;
    const { score } = this.state;
    let stats;
    let remark = "You need more practice!";

    if (score > 30 && score <= 50) remark = "Better luck next time!";
    if (score > 50 && score <= 70) remark = "You can do better!";
    if (score > 70 && score < 85) remark = "You did great!";
    if (score >= 85) remark = "You're an absolute genius!";

    if (!this.props.location.state) {
      stats = (
        <>
          <h1 className="no-stats">
            No statistics available. Please take a Quiz
          </h1>
          <div>
            <Link to="/">Back to Home</Link>
            <Link to="/play/quiz">Take a Quiz</Link>
          </div>
        </>
      );
    } else {
      stats = (
        <>
          <div className="success-icon-container">
            <span className="mdi mdi-check-circle-outline mdi-48px success-icon"></span>
          </div>
          <h1>Quiz has ended</h1>
          <div className="stats-container">
            <h3>{remark}</h3>
            <h2>Your Score: {score.toFixed(0)}%</h2>
            <span className="stat left">Total number of questions:</span>
            <span className="stat right">{state.totalQuestions}</span>
            <br />
            <span className="stat left">Number of answered questions:</span>
            <span className="stat right">{state.answeredQuestions}</span>
            <br />
            <span className="stat left">Number of correct answers:</span>
            <span className="stat right">{state.correctAnswers}</span>
            <br />
            <span className="stat left">Number of wrong answers:</span>
            <span className="stat right">{state.wrongAnswers}</span>
            <br />
            <span className="stat left">Hints used:</span>
            <span className="stat right">{state.hintsUsed}</span>
            <br />
            <span className="stat left">50-50 used:</span>
            <span className="stat right">{state.fiftyFiftyUsed}</span>
          </div>
          <div className="btn-container">
            <Link to="/">Back to Home</Link>
            <Link to="/play/quiz">Play Again</Link>
          </div>
        </>
      );
    }

    return (
      <>
        <Helmet>
          <title>Quiz App - Summary</title>
        </Helmet>
        <section className="summary container">{stats}</section>
      </>
    );
  }
}

export default withLocation(QuizSummary);
