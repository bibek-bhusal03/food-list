import React from "react";
import { useState, useEffect } from "react";
export default function MeetingRequest() {
  const [users, setUsers] = useState([]);
  const nutritionist = localStorage.getItem("NutritionistID");

  const acceptRequest = (userId) => {
    fetch(`http://localhost:8000/api/acceptRequest/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Request accepted:", data);
        // Handle any further actions after accepting the request
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
        // Handle errors, such as displaying an error message to the user
      });
  };
  const declineRequest = (userId) => {
    fetch(`http://localhost:8000/api/declineRequest/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Request declined:", data);
        // Handle any further actions after declining the request
      })
      .catch((error) => {
        console.error("Error declining request:", error);
        // Handle errors, such as displaying an error message to the user
      });
  };
  useEffect(() => {
    // Fetch teacher details when the component mounts
    fetch(`http://localhost:8000/api/getRequestedUser/${nutritionist}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  if (users.length > 0) {
    return (
      <div>
        <div>
          {users.map((user) => (
            <div className="cardNutritionistDashboard">
              <img src={user.imageURL} alt={user.firstName} />
              <div className="card-details">
                <h3>{user.firstName}</h3>
                <p>
                  <b>Email:</b> {user.email}
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => acceptRequest(user._id)}
              >
                Accept Request
              </button>
              <button
                className="btn btn-danger"
                onClick={() => declineRequest(user._id)}
              >
                Decline Request
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No Request</h1>
      </div>
    );
  }
}
