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
          <div>
            <span className="mdi mdi-cube-outline mdi-48px"></span>
          </div>
          <h1>Quiz App</h1>
          <div className="play-btn-container">
            <Link to="/play/instructions">Play</Link>
          </div>
          <div className="auth-container">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
