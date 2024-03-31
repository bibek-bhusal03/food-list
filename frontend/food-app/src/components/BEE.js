import React, { useState } from "react";
import axios from'axios'

const ActivityLevelFactors = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

function calculateBEE(userInput) {
  if (userInput.gender === "M") {
    return (
      66.5 +
      13.75 * userInput.weight +
      5.003 * userInput.height -
      6.775 * userInput.age
    );
  } else if (userInput.gender === "F") {
    return (
      655.1 +
      9.563 * userInput.weight +
      1.85 * userInput.height -
      4.676 * userInput.age
    );
  } else {
    return 0;
  }
}

function calculateTotalEnergyExpenditure(beeResult, activityLevel) {
  const activityFactor = ActivityLevelFactors[activityLevel] || 1.2;
  return beeResult * activityFactor;
}

export default function BEE() {
  const [userInput, setUserInput] = useState({
    gender: "",
    weight: "",
    height: "",
    age: 0,
    activityLevel: "sedentary",
  });
  const [beeResult, setBeeResult] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(userInput.weight) && !isNaN(userInput.height)) {
      const beeResult = calculateBEE(userInput);
      const totalEnergyExpenditure = calculateTotalEnergyExpenditure(
        beeResult,
        userInput.activityLevel
      );
  
      setBeeResult(totalEnergyExpenditure);
  
      try {
        const userID = localStorage.getItem('UserID'); // Replace with the actual user ID
        axios.put(`http://localhost:8000/api/update-bee/${userID}`, { bee: totalEnergyExpenditure });
        console.log("BEE updated successfully");
      } catch (error) {
        console.error("Error updating BEE:", error);
      }
    } else {
      console.error("Invalid weight or height values");
    }
  };

  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <select name="gender" value={userInput.gender} onChange={handleInputChange} required>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
        <br />
        <label>
          Weight:
          <input type="number" name="weight" placeholder="In Kg" value={userInput.weight} onChange={handleInputChange} required/>
        </label>
        <br />
        <label>
          Height:
          <input type="number" name="height" placeholder="In cm" value={userInput.height} onChange={handleInputChange} required/>
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={userInput.age} onChange={handleInputChange} required/>
        </label>
        <br />
        <label>
          Activity Level:
          <select name="activityLevel" value={userInput.activityLevel} onChange={handleInputChange} required>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="lightly_active">Light exercise (1-3 days per week)</option>
            <option value="moderately_active">Moderate exercise (3–5 days per week)</option>
            <option value="very_active">Heavy exercise (6–7 days per week)</option>
            <option value="extra_active">Very heavy exercise (twice per day, extra heavy workouts)</option>
          </select>
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      <p>BEE Result: {beeResult}</p>
    </div>
  );
}
