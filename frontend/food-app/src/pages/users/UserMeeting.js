import React, { useState, useEffect } from "react";

export default function UserMeeting() {
  const [nutritionists, setNutritionists] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const user = localStorage.getItem("Username");
  const userID = localStorage.getItem("UserID");

  const initiateVideoCall = (nutritionistId) => {
    fetch(`http://localhost:8000/api/sendRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        nutritionistId: nutritionistId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Video call initiated:", data);
        // Handle any further actions after initiating the video call
      })
      .catch((error) => {
        console.error("Error initiating video call:", error);
        // Handle errors, such as displaying an error message to the user
      });
  };
  useEffect(() => {
    // Fetch teacher details when the component mounts
    fetch("http://localhost:8000/api/getNutritionist")
      .then((response) => response.json())
      .then((data) => setNutritionists(data))
      .catch((error) => console.error("Error fetching nutritionists:", error));
  }, []);

  // useEffect(() => {

  // }, []);
  return (
    <div>
      {nutritionists.map((nutritionist) => (
        <div className="cardNutritionistDashboard">
          <img src={nutritionist.imageURL} alt={nutritionist.firstName} />
          <div className="card-details">
            <h3>{nutritionist.firstName}</h3>
            <p>
              <b>Email:</b> {nutritionist.email}
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => initiateVideoCall(nutritionist._id)}
          >
            Meeting Request
          </button>
        </div>
      ))}
    </div>
  );
}
