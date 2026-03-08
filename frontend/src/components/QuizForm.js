import React, { useState } from "react";
import { createQuiz } from "../services/api";
import "./QuizForm.css";

function QuizForm({ userId }) {

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    shineLevel: "",
    drynessLevel: "",
    sensitivity: "",
    concerns: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const detectSkinType = () => {
    const { shineLevel, drynessLevel, sensitivity } = formData;

    if (shineLevel === "high" && drynessLevel === "low")
      return "Oily";
    if (drynessLevel === "high" && shineLevel === "low")
      return "Dry";
    if (shineLevel === "medium" && drynessLevel === "medium")
      return "Combination";
    if (sensitivity === "high")
      return "Sensitive";

    return "Normal";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login first");
      return;
    }

    const skinType = detectSkinType();
    setResult(skinType);

    try {
      await createQuiz({
        userId: userId,
        skinType,
        concerns: formData.concerns,
        age: formData.age,
        gender: formData.gender,
      });

      alert("Quiz Submitted Successfully!");

    } catch (error) {
      alert("Error submitting quiz");
    }
  };

  const imageMap = {
    Oily: "/images/oily-skin-female.jpg",
    Dry: "/images/dry-skin-female.jpg",
    Combination: "/images/combination-skin-female.jpg",
    Sensitive: "/images/sensitive-skin-female.webp",
    Normal: "/images/normal-skin-female.png",
  };

  return (
    <div className="quiz-container">
      <h2>Skin Analysis Quiz</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="age"
          placeholder="Your Age"
          onChange={handleChange}
          required
        />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>

        <select name="shineLevel" onChange={handleChange} required>
          <option value="">How shiny is your skin?</option>
          <option value="low">Not shiny</option>
          <option value="medium">Shiny in T-zone</option>
          <option value="high">Very shiny</option>
        </select>

        <select name="drynessLevel" onChange={handleChange} required>
          <option value="">Do you experience dryness?</option>
          <option value="low">Rarely</option>
          <option value="medium">Sometimes</option>
          <option value="high">Often flaky</option>
        </select>

        <select name="sensitivity" onChange={handleChange} required>
          <option value="">Does your skin react easily?</option>
          <option value="low">No</option>
          <option value="high">Yes, very sensitive</option>
        </select>

        <input
          type="text"
          name="concerns"
          placeholder="Main Concern"
          onChange={handleChange}
        />

        <button type="submit">Analyze My Skin</button>
      </form>

      {result && (
        <div className="result-box">
          <h3>Your Skin Type: {result}</h3>
          <p>{getSkinDescription(result)}</p>
          <img src={imageMap[result]} alt={result} />
        </div>
      )}

    </div>
  );
}

const getSkinDescription = (type) => {
  const descriptions = {
    Oily: "Your skin produces excess oil and may appear shiny.",
    Dry: "Your skin lacks moisture and may feel tight.",
    Combination: "Oily in some areas and dry in others.",
    Sensitive: "Reacts easily and may show redness.",
    Normal: "Balanced and healthy skin.",
  };

  return descriptions[type];
};

export default QuizForm;
