import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Link to="/">
        <img
            src="/logo-facecard.jpg"
            alt="FaceCard Logo"
            className="logo-img"
        />
      </Link>
    </div>
  );
}

export default Logo;
