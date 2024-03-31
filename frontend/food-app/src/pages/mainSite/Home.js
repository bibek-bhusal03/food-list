import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import blog1 from "../../images/blog-1.jpg";
import blog2 from "../../images/blog-2.jpg";
import blog3 from "../../images/blog-3.jpg";
import about from "../../images/dietFitness.jpg";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Ticker from "../../components/Ticker";
const CustomPrevArrow = (props) => (
  <div
    classNameName="custom-prev-arrow"
    onClick={props.onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: 15,
      cursor: "pointer",
      fontSize: "24px",
      color: "black",
      backgroundColor: "image",
      padding: "10px",
      borderRadius: "50%",
    }}
  >
    {"<"}
  </div>
);

const CustomNextArrow = (props) => (
  <div
    classNameName="custom-next-arrow"
    onClick={props.onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: 10,
      cursor: "pointer",
      fontSize: "24px",
      color: "black",
      backgroundColor: "image",
      padding: "10px",
      borderRadius: "50%",
    }}
  >
    {">"}
  </div>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    service: false,
    about: false,
    feature: false,
  });

  useEffect(() => {
    function handleScroll() {
      const serviceSection = document.querySelector(".serviceCon");
      const servicePosition = serviceSection.getBoundingClientRect().top;
      const aboutSection = document.querySelector(".about-section");
      const aboutPosition = aboutSection.getBoundingClientRect().top;
      const featuresSection = document.querySelector(".Features");
      const featuresPosition = featuresSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      setIsVisible({
        service: servicePosition < windowHeight / 1.3,
        about: aboutPosition < windowHeight / 1.3,
        feature: featuresPosition < windowHeight / 1.3,
      });
    }

    handleScroll(); // Initial check on component mount

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />, // Use your custom component for previous arrow
    // nextArrow: <CustomNextArrow />, // Use your custom component for next arrow
    autoplay: true,
    autoplaySpeed: 4000,
    className: "custom-slick-slider",
  };
  return (
    <div>
      {/* <Loader /> */}
      <Header />
      <hr />
      {/* <!-- Slider Area --> */}
      <section className="slider py-2">
        <div className="hero-slider">
          {/* <!-- Start Single Slider --> */}
          <Slider {...settings}>
            <div className="single-slider">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="text text-and-buttons">
                      <h1>
                        We Provide <span>Medical</span> Services That You Can{" "}
                        <span>Trust!</span>
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sed nisl pellentesque, faucibus libero eu,
                        gravida quam.{" "}
                      </p>
                      <div className="button">
                        <Link to="/userLogin" className="btn">
                          Login
                        </Link>
                        <Link to="/userSignup" className="btn primary">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Single Slider -->
				<!-- Start Single Slider --> */}
            <div className=" single-slider single-slider2 ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="text text-and-buttons">
                      <h1>
                        Elevate Your Fitness Experience with{" "}
                        <span>Nutrinest</span>
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sed nisl pellentesque, faucibus libero eu,
                        gravida quam.{" "}
                      </p>
                      <div className="button">
                        <Link to="/userLogin" className="btn">
                          Login
                        </Link>
                        <Link to="/userSignup" className="btn primary">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Start End Slider -->
				<!-- Start Single Slider --> */}
          </Slider>
          {/* <!-- End Single Slider --> */}
        </div>
      </section>
      {/* <!--/ End Slider Area --> */}

      {/* <!--/ Ticker Area --> */}
      <Ticker/>
      {/* <!--/ End Ticker Area --> */}

      {/* <!-- Start Feautes --> */}
      <section
        className={`container-fluid Features section ${
          isVisible.feature ? "featureAnimation" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center py-5">
                <h2>We Are Always Ready to Help With Your Diet</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-features">
                <div className="single-icon">
                  <i className="fa fa-cutlery"></i>
                </div>
                <h3>Personalized Diet Plans</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-features">
                <div className="single-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h3>Health Assessment Tools</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-features last">
                <div className="single-icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <h3>Online Meetings</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--/ End Feautes --> */}

      {/* <!--/ Start service --> */}
      <section className="services section">
        <div
          className={`serviceCon container ${
            isVisible.service ? "serviceAnimation" : ""
          }`}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center py-5">
                <h2>What do we Offer</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          {/* 1st row */}
          <div className="row text-center">
            <div className="service-col col-lg-4 col-md-6 col-12 coloum">
              <div className="single-service">
                <h4>
                  <i className="fa fa-cutlery mr-3"></i>
                  Customized Diet Plan
                </h4>
                <p>
                  lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec luctus dictum eros ut imperdiet lorem lorem Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Donec luctus
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 coloum">
              <div className="single-service">
                <h4>
                  <i className="fa fa-bullseye mr-3"></i>
                  Targeting Goals
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet lorem lorem Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Donec luctus
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 coloum">
              <div className="single-service">
                <h4>
                  <i className="fa fa-stethoscope mr-3"></i>
                  Online Nutritionist
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.lorem lorem Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Donec luctus
                </p>
              </div>
            </div>
          </div>
          {/* 1st row end*/}

          {/* 2nd row */}
          <div className="row text-center">
            <div className="service-col col-lg-4 col-md-6 col-12 mb-3 coloum">
              <div className="single-service">
                <h4>
                  <i className="fa fa-weight-scale mr-3"></i>
                  Calculate BMI
                </h4>
                <p>
                  lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec luctus dictum eros ut imperdiet lorem lorem Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Donec luctus
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-3 coloum">
              <div className="single-service">
                <h4>
                  <i className="fa fa-burn mr-3"></i>
                  Calculate BEE
                </h4>
                <p>
                  lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec luctus dictum eros ut imperdiet lorem lorem Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Donec luctus
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-3 coloum">
              <div className="single-service">
                <h4>
                  <i className="fa fa-stethoscope mr-3"></i>
                  Online Nutritionist
                </h4>
                <p>
                  lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec luctus dictum eros ut imperdiet lorem lorem Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Donec luctus
                </p>
              </div>
            </div>
          </div>
          {/* 2nd row end */}
        </div>
      </section>
      {/* <!--/ End service --> */}

      {/* <!--/ Start About Us --> */}
      <section
        className={`about-section ${isVisible.about ? "aboutAnimation" : ""}`}
      >
        <div class="container">
          <div class="row">
            <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div class="inner-column">
                <div class="sec-title">
                  <span class="title">About Us</span>
                  <h2>We are Creative Tech Enthusiast working since 2015</h2>
                </div>
                <div class="text">
                  I am Rahul Yaduvanshi works at Css3 Transition since last 3
                  years. We are here to provide touch notch solution for your
                  website or web application that helps you to make your website
                  look attractive & efficient in handling by creating usefull
                  plugins thats you need.
                </div>
                <div class="text">
                  We are here to serve you next level tutorial that currently in
                  trend to match you with your expertise. Css3 transition is a
                  learning website. where you can find many good quality content
                  related to web development and tutorials about plugins. here
                  we are using html, html5, css, css3, jquery & javascript along
                  with inspirational UI design layout by professionals by using
                  Photoshop and adobe allustrator.
                </div>
                <div class="btn-box">
                  <Link
                    to="/contactUs"
                    onClick={scrollToTop}
                    class="theme-btn btn-style-one"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* <!-- Image Column --> */}
            <div class="image-column col-lg-6 col-md-12 col-sm-12">
              <div class="inner-column wow fadeInLeft">
                <div class="author-desc">
                  <h2>About Us</h2>
                </div>
                <figure class="image-1">
                  <img title="About Us" src={about} alt="About Us" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--/ End About Us --> */}

      {/* <!--/ Start Testimonials --> */}
      <div className="container-fluid testimonials py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="section-title position-relative mb-4">
                <h4 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Testimonial
                </h4>
                <h1 className="display-4">What Say Our Students</h1>
              </div>
              <p className="m-0">
                Dolor est dolores et nonumy sit labore dolores est sed rebum
                amet, justo duo ipsum sanctus dolore magna rebum sit et. Diam
                lorem ea sea at. Nonumy et at at sed justo est nonumy tempor.
                Vero sea ea eirmod, elitr ea amet diam ipsum at amet. Erat sed
                stet eos ipsum diam
              </p>
            </div>
            <div className="col-lg-7">
              <div className="owl-carousel testimonial-carousel">
                <Slider {...settings}>
                  <div className="testimonial-div p-5">
                    <i className="fa fa-3x fa-quote-left logo mb-4"></i>
                    <p>
                      Sed et elitr ipsum labore dolor diam, ipsum duo vero sed
                      sit est est ipsum eos clita est ipsum. Est nonumy tempor
                      at kasd. Sed at dolor duo ut dolor, et justo erat dolor
                      magna sed stet amet elitr duo lorem
                    </p>
                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                      <img
                        className="img-fluid mr-4"
                        src="img/testimonial-2.jpg"
                        alt=""
                      />
                      <div>
                        <h5>Student Name</h5>
                        <span>Web Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-div p-5">
                    <i className="fa fa-3x fa-quote-left logo mb-4"></i>
                    <p>
                      Sed et elitr ipsum labore dolor diam, ipsum duo vero sed
                      sit est est ipsum eos clita est ipsum. Est nonumy tempor
                      at kasd. Sed at dolor duo ut dolor, et justo erat dolor
                      magna sed stet amet elitr duo lorem
                    </p>
                    <div className="d-flex flex-shrink-0 align-items-center mt-4">
                      <img
                        className="img-fluid mr-4"
                        src="img/testimonial-1.jpg"
                        alt=""
                      />
                      <div>
                        <h5>Student Name</h5>
                        <span>Web Design</span>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--/ End Testimonials --> */}

      {/* <!-- Start Blog Area --> */}
      <section className="blog section py-5" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center py-5">
                <h2>Keep up with Our Most Recent Medical News.</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <Link to="/blogs" className="single-blog">
                  <div className="news-head">
                    <img src={blog2} alt="#" />
                  </div>
                  <div className="news-body">
                    <div className="news-content">
                      <div className="date">22 Aug, 2020</div>
                      <h2>
                        <a href="blog-single.html">
                          We have annnocuced our new product.
                        </a>
                      </h2>
                      <p className="text">
                        Lorem ipsum dolor a sit ameti, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt sed do incididunt
                        sed.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <Link to="/blogs" className="single-blog">
                  <div className="news-head">
                    <img src={blog3} alt="#" />
                  </div>
                  <div className="news-body">
                    <div className="news-content">
                      <div className="date">15 Jul, 2020</div>
                      <h2>
                        <a href="blog-single.html">
                          Top five way for solving teeth problems.
                        </a>
                      </h2>
                      <p className="text">
                        Lorem ipsum dolor a sit ameti, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt sed do incididunt
                        sed.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <Link to="/blogs" className="single-blog">
                  <div className="news-head">
                    <img src={blog1} alt="#" />
                  </div>
                  <div className="news-body">
                    <div className="news-content">
                      <div className="date">05 Jan, 2020</div>
                      <h2>
                        <a href="blog-single.html">
                          We provide highly business soliutions.
                        </a>
                      </h2>
                      <p className="text">
                        Lorem ipsum dolor a sit ameti, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt sed do incididunt
                        sed.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="blogMore">
            <br />
            <p>
              <span className="line"></span>
              <Link to="blogs" onClick={scrollToTop} className="readMoreLink">
                Read More
              </Link>
              <span className="line"></span>
            </p>
          </div>
        </div>
      </section>
      {/* <!-- End Blog Area --> */}
      <br />
      <br />
      <br />
      <hr />
      <Footer />
    </div>
  );
}
