import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import forgotPassword from "../../images/forgotPassword.jpg";

export default function ForgotPassword() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 200) {
        toast.success("Email Sent to your Account!");
        setFormData({ email: "" });
      } else {
        toast.error("Error in sending Email.");
        setFormData({ email: "" });
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
    }
  };
  return (
    <div>
      <Header />
      <hr />
      <br />
      <br />
      <br />
      <div className="container py-3">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-6">
              <div className="card-body">
                <p className="login-card-description">Forgot Your Password?</p>
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      autocomplete="off"
                      required
                      placeholder="Email"
                    />
                  </div>
                  <button type="submit" className="btn btn-block btnSignup mb-4">
                    Send Email
                  </button>
                </form>
                <p className="login-card-footer-text">
                  Back to Login?{" "}
                  <Link to="/userLogin" className="text-reset" onClick={scrollToTop}>
                    Click Here
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img src={forgotPassword} alt="login" className="login-card-img" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <hr />
      <Footer />
    </div>
  );
}
