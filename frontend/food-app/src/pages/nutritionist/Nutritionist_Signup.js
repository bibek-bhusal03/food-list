import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import signupimg from "../../images/Signup.jpg";
import { toast } from "react-toastify";

export default function Nutritionist_Signup() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append("NutritionistID", formData._id);
    formDataWithImage.append("firstName", formData.firstName);
    formDataWithImage.append("lastname", formData.lastname);
    formDataWithImage.append("username", formData.username);
    formDataWithImage.append("email", formData.email);
    formDataWithImage.append("password", formData.password);
    formDataWithImage.append("image", formData.image);

    try {
      const response = await fetch(
        "http://localhost:8000/api/nutritionistSignup",
        {
          method: "POST",
          body: formDataWithImage,
        }
      );
      if (response.ok) {
        toast.success("Nutritionist Signup successfully!");
        setFormData({
          firstName: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          image: null,
        });
        document.getElementById("imageInput").value = "";
      } else {
        toast.error("Nutritionist Signup failed.");
        const errorData = await response.json();
        console.log(errorData);
        // Handle error, show error message, or redirect to an error page
      }
    } catch (error) {
      console.error("Error during signup:", error.response.data.message);
    }
  };
  return (
    <>
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
              <div className="card-body">
                <p className="login-card-description">
                  Create Account as Nutritionist
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                      autocomplete="off"
                      required
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      value={formData.lastname}
                      onChange={handleChange}
                      autocomplete="off"
                      required
                      placeholder="Last Name"
                    />
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autocomplete="off"
                      required
                      placeholder="Username"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      autocomplete="off"
                      required
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autocomplete="off"
                      required
                      className="form-control"
                      placeholder="Password"
                    />
                    <input
                      type="file"
                      name="image"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: e.target.files[0],
                        })
                      }
                      className="form-control"
                      accept="image/*"
                      id="imageInput"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btnSignup mb-4"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="login-card-footer-text">
                  Already have an account?{" "}
                  <Link
                    to="/consultantLogin"
                    className="text-reset"
                    onClick={scrollToTop}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img src={signupimg} alt="login" className="login-card-img" />
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
    </>
  );
}
