import React from "react";
import { Link, useNavigate } from "react-router-dom";
import QuizForm from "./QuizForm";
import ViewResults from "./ViewResults";
import Logo from "./Logo";

function Dashboard({ user, setUser }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser({ userId: null, name: null });
    navigate("/");
  };

  return (
    <div style={{ padding: "30px", background: "#f4f6f9", minHeight: "100vh" }}>

      {/* Top Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
         src="/logo-facecard.jpg"
         alt="logo"
         style={{ width: "60px" }}
        />
        <h2>Welcome, {user.name}</h2>
         </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/">
            <button>Home</button>
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

      {/* QuizResults */}
      <QuizForm userId={user.userId} />
      <ViewResults userId={user.userId} />

    </div>
  );
}

export default Dashboard;
