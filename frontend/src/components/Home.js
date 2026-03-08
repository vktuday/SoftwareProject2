import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import Logo from "./Logo";

function Home() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h1> Face Card Skin Analyzer</h1>
        <p>Discover your skin type instantly</p>

        <Link to="/login">
          <button style={{ marginBottom: "10px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
