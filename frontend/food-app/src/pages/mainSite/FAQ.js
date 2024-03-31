import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import faqimg from "../../images/faq.jpg";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
const FAQ = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const faqData = [
    {
      id: "collapseOne",
      question: "How many servings from each food group do I need each day?",
      answer:
        "The number of servings you need each day from each food group depends on your calorie needs. To determine your calories needs go to the (BEE Calculator LINK).",
    },
    {
      id: "collapseTwo",
      question: "How can I burn off my stored body fat?",
      answer:
        "We all need some body fat, but if stored fat is excessive it may increase risk of diet-related diseases such as heart disease, diabetes, and some cancers. This is particularly true if excess fat is in the abdominal area. According to the CDC, a body mass index, or BMI, of 25 or higher is an indication that your weight may be unhealthy. Calculate your BMI. The best strategy for losing excess weight and stored body fat involves calorie reduction, increased physical activity, and a behavior change plan.",
    },
    {
      id: "collapseThree",
      question: "I'm on a diet to lose weight. Do I still need to exercise?",
      answer:
        "Physical activity is a key component of helping you move toward a healthier weight, as it can help you achieve the appropriate calorie balance. People who exercise regularly may be more likely to keep the weight from coming back after losing weight. Check our Gym Fitness to start your exercices.",
    },
    {
      id: "collapseFour",
      question: "How can I get enough nutrients without consuming too many calories?",
      answer:
        "First, check calculate your calories need and then make the meal plan accordingly.",
    },
  ];

  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      {/* <Loader/> */}
      <Header />
      <hr/>
      <div className="container">
        <div
          class="section_heading text-center wow fadeInUp py-5"
          data-wow-delay="0.2s"
        >
          <h3>
            <span>Frequently </span> Asked Questions
          </h3>
          <p>
            Appland is completely creative, lightweight, clean &amp; super
            responsive app landing page.
          </p>
        </div>
        <div className="row py-3">
          <div className="col-md-6 py-5">
            {/* FAQ Area */}
            <div className="accordion faq-accordian" id="faqAccordion">
              {faqData.map((faq) => (
                <div className="card border-0" key={faq.id}>
                  <div className={`card-header mb-0 ${
                        activeId === faq.id ? "" : "collapsed"
                      }`}
                      onClick={() => handleToggle(faq.id)} id={faq.id}>
                    <h6
                      
                    >
                      {faq.question}
                      <span className="lni-chevron-up"></span>
                    </h6>
                  </div>
                  <div
                    className={`collapse ${activeId === faq.id ? "show" : ""}`}
                    aria-labelledby={faq.id}
                    data-parent="#faqAccordion"
                  >
                    <div className="card-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Support Button */}
            <div className="support-button text-center d-flex align-items-center justify-content-center mt-4">
              <i className="lni-emoji-sad"></i>
              <p className="mb-0 px-2">Can't find your answers?</p>
              <Link to='/contactUs' onClick={scrollToTop}> Contact us</Link>
            </div>
          </div>
          <div className="col-md-6">
            {/* Image on the right side */}
            <img src={faqimg} alt="Faq" className="faqImage" />
          </div>
        </div>
      </div>
      <br/>
      <hr/>
      <Footer />
    </div>
  );
};

export default FAQ;
