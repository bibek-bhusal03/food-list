import React from 'react'
import { Link } from 'react-router-dom'
import Newsletter from './Newsletter';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  return (
    <div>
    <div class="container-fluid position-relative overlay-top footerbg text-white-50 py-5" >
        <div class="container mt-5 pt-5">
            <div class="row">
                <div class="col-md-6 mb-5">
                    <Link to='/' class="navbar-brand" onClick={scrollToTop}>
                        <h1 class="mt-n2 text-uppercase text-white"><i class="fa fa-seedling mr-3"></i>Nutrinest</h1>
                    </Link>
                    <p class="m-0">Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem at et diam est, tempor rebum ipsum sit ea tempor stet et consetetur dolores. Justo stet diam ipsum lorem vero clita diam</p>
                </div>
                <div class="col-md-6 mb-5">
                    <Newsletter/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 mb-5">
                    <h3 class="text-white mb-4">Get In Touch</h3>
                    <p><i class="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
                    <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                    <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
                    <div class="d-flex justify-content-start mt-4">
                        <a class="text-white mr-4" href="https://www.twitter.com"><i class="fab fa-2x fa-twitter"></i></a>
                        <a class="text-white mr-4" href="https://www.facebook.com"><i class="fab fa-2x fa-facebook-f"></i></a>
                        <a class="text-white mr-4" href="https://www.linkedin.com"><i class="fab fa-2x fa-linkedin-in"></i></a>
                        <a class="text-white" href="https://www.instagram.com"><i class="fab fa-2x fa-instagram"></i></a>
                    </div>
                </div>
                <div class="col-md-4 mb-5">
                {/* <h3 class="text-white mb-4">Get In Touch</h3>
                    <p><i class="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
                    <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                    <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
                    <div class="d-flex justify-content-start mt-4">
                        <a class="text-white mr-4" href="https://www.twitter.com"><i class="fab fa-2x fa-twitter"></i></a>
                        <a class="text-white mr-4" href="https://www.facebook.com"><i class="fab fa-2x fa-facebook-f"></i></a>
                        <a class="text-white mr-4" href="https://www.linkedin.com"><i class="fab fa-2x fa-linkedin-in"></i></a>
                        <a class="text-white" href="https://www.instagram.com"><i class="fab fa-2x fa-instagram"></i></a>
                    </div> */}
                </div>
                <div class="col-md-4 mb-5">
                    <h3 class="text-white mb-4">Quick Links</h3>
                    <div class="d-flex flex-column justify-content-start">
                        <Link class="text-white-50 mb-3" to='/' onClick={scrollToTop}><i class="fa fa-angle-right mr-2"></i>Home</Link>
                        <Link class="text-white-50 mb-3" href="#" onClick={scrollToTop}><i class="fa fa-angle-right mr-2"></i>About Us</Link>
                        <Link class="text-white-50 mb-3" to='/faq' onClick={scrollToTop}><i class="fa fa-angle-right mr-2"></i>Regular FAQs</Link>
                        <Link class="text-white-50 mb-3" to="/contactUs" onClick={scrollToTop}><i class="fa fa-angle-right mr-2"></i>Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid footer2bg text-white-50 border-top py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                    <p class="m-0">Copyright &copy; <Link class="text-white" to='/' onClick={scrollToTop}>Nutrinest</Link>. All Rights Reserved.
                    </p>
                </div>
                <div class="col-md-6 text-center text-md-right">
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
