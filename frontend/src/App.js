import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState({
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
  });

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            user.userId ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
