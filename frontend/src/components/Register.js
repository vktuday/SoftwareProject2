import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import Logo from "./Logo";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

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

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
