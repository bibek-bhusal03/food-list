import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import loginimg from "../../images/login.jpg";
import { HiEye, HiEyeOff } from "react-icons/hi";
import useLoggedInUser from "../../zustand/useLoggedInUser";

export default function Nutritionist_Login() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
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
        "http://localhost:8000/api/nutritionistLogin",
        formData
      );
      console.log(response.data);
             const { firstName, image, _id, token } =
               response?.data?.user || {};
      localStorage.setItem("Nutritionist_token", token);
      localStorage.setItem(
        "Nutritionist_Username",
        response.data.user.firstName
      );
      localStorage.setItem("NutritionistID", response.data.user._id);
      localStorage.setItem("NutritionistLoggedIn", true);
      localStorage.setItem("Nutritionistrole", "Nutritionist");
        
      setLoggedInUser({
        _id,
        image,
        firstName,
        token,
        NutritionistLoggedIn: true,
      });



      navigate("/consultantDashboard");
      toast.success("Login Successfully!");
    } catch (error) {
      setFormData({
        usernameOrEmail: "",
        password: "",
      });
      toast.error("Wrong Credentials");
      console.error("Login error:", error.response.data);
      // Handle error, e.g., display error message to the user
    }
  };
  return (
    <>
      {/* <Loader/> */}
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
                <p className="login-card-description">
                  Hey, Nutritionist Welcome Back!
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="email" className="sr-only">
                      Username OR Email
                    </label>
                    <input
                      type="tect"
                      name="usernameOrEmail"
                      value={formData.usernameOrEmail}
                      onChange={handleChange}
                      required
                      autocomplete="off"
                      className="form-control"
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
                <p className="login-card-footer-text">
                  Don't have an account?{" "}
                  <Link
                    to="/consultantSignup"
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
      {/* <form onSubmit={handleSubmit}>
          <label>
            Username or Email:
            <input type="text" name="usernameOrEmail" value={formData.usernameOrEmail} onChange={handleChange} required autoComplete="off"/>
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required autoComplete="off"/>
          </label>
          <button type="submit">Log In</button>
    </form>
    <p>Don't have an account?</p><Link to='/consultantSignup'>Sign Up</Link> */}
      <br />
      <br />
      <br />
      <br />
      <hr />
      <Footer />
    </>
  );
}
