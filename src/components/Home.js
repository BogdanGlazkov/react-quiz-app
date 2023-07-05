import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quiz App - Home</title>
      </Helmet>
      <div id="home">
        <section>
          <div className="cube-container">
            <span className="mdi mdi-cube-outline cube"></span>
          </div>
          <h1>Quiz App</h1>
          <div className="play-btn-container">
            <Link className="play-btn" to="/play/instructions">
              Play
            </Link>
          </div>
          <div className="auth-container">
            <Link className="auth-btn" to="/login" id="login-btn">
              Login
            </Link>
            <Link className="auth-btn" to="/register" id="signup-btn">
              Sign Up
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
