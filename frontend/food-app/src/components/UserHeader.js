import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function UserHeader() {
  const user = localStorage.getItem("Username");
  const userID = localStorage.getItem('UserID');

  const [userImage, setUserImage] = useState(null);
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/userImage/${userID}`);
        
        if (response.ok) {
          const imageData = await response.blob();
          setUserImage(URL.createObjectURL(imageData));
        } else {
          // Handle error
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.error('Error fetching user image:', error);
      }
    };
    fetchUserImage();
    }, []);
  return (
    <div>
      {/* <!-- Navbar Start --> */}
      <div class="container-fluid p-0">
        <nav class="navbar userNav navbar-expand-lg navbar-light">
          <Link to="/" class="navbar-brand ml-lg-3">
            <h1 class="m-0 text-uppercase userlogo">
              <i class="fa fa-seedling mr-3"></i>Nutrinest
            </h1>
          </Link>
          <div className="userProfilelogo">
            <button className="profileBtn">
              {/* <CgProfile /> */}
              <img src={userImage} alt="User" width={45} height={45} className='profileBtnLogo'/>
              <p className="profileText"></p>
            </button>
          </div>
        </nav>
      </div>
      {/* <!-- Navbar End --> */}
    </div>
  );
}
