import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Quiz extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz App - Quiz</title>
        </Helmet>
        <div className="questions">
          <div className="lifeline-container">
            <p>
              <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
              2
            </p>
            <p>
              <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
              5
            </p>
          </div>
          <div>
            <p>
              <span>1 of 15</span>
              2:15<span className="mdi mdi-clock-outline mdi-24px"></span>
            </p>
          </div>
          <h5>Google was founded in what year?</h5>
          <div className="options-container">
            <p className="option">1997</p>
            <p className="option">1998</p>
          </div>
          <div className="options-container">
            <p className="option">1999</p>
            <p className="option">2000</p>
          </div>
          <div className="btn-container">
            <button type="button">Privious</button>
            <button type="button">Next</button>
            <button type="button">Quit</button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
