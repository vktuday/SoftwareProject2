import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import Logo from "./Logo";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(form);

    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("name", res.data.name);

    setUser({
    userId: res.data.userId,
    name: res.data.name,
    });

  navigate("/dashboard");

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
           <Link to="/" className="home-link">
           ← Back to Home
           </Link>
        </div>
        <Logo />
        <h2>Welcome</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
