import React, {useState} from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

    const handleToggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
  return (
    <div>
      {/* <!-- Topbar Start --> */}
      <div class="container-fluid bg">
        <div class="row py-2 px-lg-5">
          <div class="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div class="d-inline-flex align-items-center text-white">
              <small>
                <i class="fa fa-phone-alt mr-2"></i>+012 345 6789
              </small>
              <small class="px-3">|</small>
              <small>
                <i class="fa fa-envelope mr-2"></i>info@example.com
              </small>
            </div>
          </div>
          <div class="col-lg-6 text-center text-lg-right">
            <div class="d-inline-flex align-items-center">
              <a class="text-white px-2" href="https://www.facebook.com">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="text-white px-2" href="https://www.twitter.com">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="text-white px-2" href="https://www.linkedin.com">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="text-white px-2" href="https://www.instagram.com">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="text-white pl-2" href="https://www.youtube.com">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      <div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
          <Link to='/' class="navbar-brand ml-lg-3">
            <h1 class="m-0 text-uppercase logo">
              <i class="fa fa-seedling mr-3"></i>Nutrinest
            </h1>
          </Link>
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
            onClick={handleToggleNav}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">
                                    Home <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/blogs' className="nav-link">
                                    Blogs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/contactUs' className="nav-link">
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/faq' className="nav-link">
                                    FAQs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/consultantLogin'>
                                    Login as Consultant
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/userLogin'>
                                    Login as Customer
                                </Link>
                            </li>
                        </ul>
                    </div>
        </nav>
      </div>
      {/* <!-- Navbar End --> */}
    </div>
  );
}
