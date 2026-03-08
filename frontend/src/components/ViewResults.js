import React, { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";
import "./ViewResults.css";

function ViewResults({ userId }) {   
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await getQuizzes(userId);   
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="results-container">
      <h2>Your Previous Skin Analysis</h2>

      {quizzes.length === 0 && <p>.............................</p>}

      {quizzes.map((quiz) => (
        <div key={quiz._id} className="result-card">
          <h3>{quiz.name}</h3>
          <p><strong>Age:</strong> {quiz.age}</p>
          <p><strong>Gender:</strong> {quiz.gender}</p>
          <p><strong>Skin Type:</strong> {quiz.skinType}</p>
          <p><strong>Concern:</strong> {quiz.concerns}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewResults;
