import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiBorderRadius, BiLoaderCircle } from "react-icons/bi";

export default function UserMainContent() {
  const user = localStorage.getItem("Username");
  const userID = localStorage.getItem("UserID");

  const [userImage, setUserImage] = useState(null);
  const [nutritionistData, setNutritionistData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-user/${userID}`
        );
        setNutritionistData(response.data.user.NutritionistData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/userImage/${userID}`
        );

        if (response.ok) {
          const imageData = await response.blob();
          setUserImage(URL.createObjectURL(imageData));
        } else {
          // Handle error
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };
    fetchUserImage();
  }, []);
  return (
    <div>
      <h4 className="py-2 text-center">
        <i>Welcome back, {user}!</i>
      </h4>
      <div class="container pt-4">
        <div class="row align-items-stretch">
          <div class="c-dashboardInfo col-lg-3 col-md-6">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Your BMI
              </h4>
              <span class="hind-font caption-12 c-dashboardInfo__count">
                {nutritionistData ? (
                  <>{nutritionistData.bmi}</>
                ) : (
                  <p>
                    <BiLoaderCircle />
                    Loading...
                  </p>
                )}
              </span>
            </div>
          </div>
          <div class="c-dashboardInfo col-lg-3 col-md-6">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Your BEE
              </h4>
              <span class="hind-font caption-12 c-dashboardInfo__count">
                {nutritionistData && nutritionistData.bee ? (
                  <>{nutritionistData.bee.toFixed(2)}</>
                ) : (
                  <p>
                    <BiLoaderCircle />
                    Loading...
                  </p>
                )}
              </span>
            </div>
          </div>
          <div class="c-dashboardInfo col-lg-3 col-md-6">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Your Meal Plan
              </h4>
              <span class="hind-font caption-12 c-dashboardInfo__count">
                {nutritionistData ? (
                  <>{nutritionistData.meal}</>
                ) : (
                  <p>
                    <BiLoaderCircle />
                    Loading...
                  </p>
                )}
              </span>
            </div>
          </div>
          <div class="c-dashboardInfo col-lg-3 col-md-6">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Your Profile
              </h4>
              <span class="hind-font caption-12 c-dashboardInfo__count">
                {userImage && (
                  <img src={userImage} alt="User" width={100} height={100} />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
