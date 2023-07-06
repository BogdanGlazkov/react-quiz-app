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
          <h2>Google was founded in what year?</h2>
          <div className="options-container">
            <p className="option">1997</p>
            <p className="option">1998</p>
          </div>
          <div className="options-container">
            <p className="option">1999</p>
            <p className="option">2000</p>
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
