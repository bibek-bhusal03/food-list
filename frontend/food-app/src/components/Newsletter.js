import { useState } from "react";
import React from "react";
import { toast } from "react-toastify";

export default function Newsletter() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/subscribeNewsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setFormData({
          email: "",
        });
        toast.success("Successfully Subscribed");
      } else {
        setFormData({
          email: "",
        });
        toast.error("Subscription Failed");
        const errorData = await response.json();
        console.log(errorData);
        // Handle error, show error message, or redirect to an error page
      }
    } catch (error) {
      console.error("Error during subscription:", error.response.data.message);
    }
  };
  return (
    <div>
      <h3 class="text-white mb-4">Newsletter</h3>
      <div class="w-100">
        <form onSubmit={handleSubmit}>
          <div class="input-group">
            <input
              type="email"
              name="email"
              class="form-control border-light"
              placeholder="Your Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <div class="input-group-append">
              <button class="btn btn-primary px-4" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
