import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import Eye icons
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import loginimg from "../../images/login.jpg";
import useLoggedInUser from "../../zustand/useLoggedInUser";

export default function Login() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    showPassword: false, // Add state for controlling password visibility
  });

  const navigate = useNavigate();
  const { setLoggedInUser } = useLoggedInUser();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      const { firstName, image, _id, token } = response?.data?.user || {};

      console.log(response.data);
      localStorage.setItem("User_token", token);
      localStorage.setItem("Username", response.data.user.firstName);
      localStorage.setItem("UserID", response.data.user._id);
      localStorage.setItem("UserLoggedIn", true);
      localStorage.setItem("Userrole", "User");
      localStorage.setItem("ProfilePic", response.data.user.image);


      setLoggedInUser({
        _id,
        image,
        firstName,
        token,
      });

      navigate("/userDashboard");
      toast.success("Login Successfully!");
    } catch (error) {
      setFormData({
        usernameOrEmail: "",
        password: "",
        showPassword: false,
      });
      toast.error("Wrong Credentials");
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <div>
      {/* <Loader /> */}
      <Header />
      <hr />
      <br />
      <br />
      <br />
      <div className="container py-3">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-6">
              <img src={loginimg} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <p className="login-card-description">Hey, Welcome Back!!!</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="email" className="sr-only">
                      Username OR Email
                    </label>
                    <input
                      type="text"
                      name="usernameOrEmail"
                      value={formData.usernameOrEmail}
                      onChange={handleChange}
                      required
                      autocomplete="off"
                      className="form-control inputField"
                      placeholder="Email OR Username"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label for="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type={formData.showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autocomplete="off"
                      className="form-control"
                      placeholder="Password"
                    />
                    <span onClick={togglePasswordVisibility}>
                      {formData.showPassword ? (
                        <HiEyeOff className="passwordEye" />
                      ) : (
                        <HiEye className="passwordEye" />
                      )}
                    </span>
                  </div>
                  <button className="btn btn-block btncolor mb-4" type="submit">
                    Log In
                  </button>
                </form>
                <Link
                  to="/forgot-password"
                  className="forgot-password-link"
                  onClick={scrollToTop}
                >
                  Forgot password?
                </Link>
                <p className="login-card-footer-text">
                  Don't have an account?{" "}
                  <Link
                    to="/userSignup"
                    className="text-reset"
                    onClick={scrollToTop}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <hr />
      <Footer />
    </div>
  );
}
