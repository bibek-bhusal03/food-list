import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    subject: "",
    message: "",
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
      const response = await fetch("http://localhost:8000/api/contactQueries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Query sent successfully!');
        setFormData({
          Name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.log('Error in Contact us: ', errorData);
        toast.error('Query not submitted!');
      }
    } catch (error) {
      console.error("Error registering query:", error);
      toast.error('Error Occur in sending query');
    }
  };
  return (
    <div>
      {/* <Loader /> */}
      <Header />
      <hr />
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="wrapper">
                <div class="row ">
                  <div class="col-md-6">
                    <div class="contact-wrap w-100 p-lg-5 p-4">
                      <h3 class="mb-4">Send us a message</h3>
                      <form
                        onSubmit={handleSubmit}
                        id="contactForm"
                        name="contactForm"
                        class="contactForm"
                      >
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                name="Name"
                                placeholder="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                id="name"
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <input
                                type="email"
                                class="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                name="subject"
                                id="subject"
                                value={formData.subject}
                                placeholder="Subject"
                                onChange={handleChange}
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <textarea
                                name="message"
                                class="form-control"
                                id="message"
                                cols="30"
                                rows="6"
                                placeholder="Message"
                                onChange={handleChange}
                                value={formData.message}
                                autoComplete="off"
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <input
                                type="submit"
                                value="Send Message"
                                class="contactBtn btn btn-primary"
                              />
                              <div class="submitting"></div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex align-items-stretch">
                    <div class="info-wrap w-100 p-lg-5 p-4 img">
                      <h3>Contact us</h3>
                      <p class="mb-4">
                        We're open for any suggestion or just to have a chat
                      </p>
                      <div class="dbox w-100 d-flex align-items-start">
                        <div class="icon d-flex align-items-center justify-content-center">
                          <span class="fa fa-map-marker"></span>
                        </div>
                        <div class="text pl-3">
                          <p>
                            <span>Address:</span> 198 West 21th Street, Suite
                            721 New York NY 10016
                          </p>
                        </div>
                      </div>
                      <div class="dbox w-100 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center">
                          <span class="fa fa-phone"></span>
                        </div>
                        <div class="text pl-3">
                          <p>
                            <span>Phone:</span>{" "}
                            <a href="tel://1234567920">+ 1235 2355 98</a>
                          </p>
                        </div>
                      </div>
                      <div class="dbox w-100 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center">
                          <span class="fa fa-paper-plane"></span>
                        </div>
                        <div class="text pl-3">
                          <p>
                            <span>Email:</span>{" "}
                            <a href="mailto:info@yoursite.com">
                              info@yoursite.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="dbox w-100 d-flex align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center">
                          <span class="fa fa-globe"></span>
                        </div>
                        <div class="text pl-3">
                          <p>
                            <span>Website</span> <a href="#">yoursite.com</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Footer />
    </div>
  );
}
