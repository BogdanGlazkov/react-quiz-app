import React, { Component } from "react";
import { useLocation } from "react-router-dom";
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
    this.setState({
      score: (state.correctAnswers / state.totalQuestions) * 100,
      totalQuestions: state.totalQuestions,
      answeredQuestions: state.answeredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: state.fiftyFiftyUsed,
      hintsUsed: state.hintsUsed,
    });
  }

  render() {
    <>
      <Helmet>
        <title>Quiz App - Summary</title>
      </Helmet>
    </>;
  }
}

export default withLocation(QuizSummary);
