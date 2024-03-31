import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";
import Modal from "react-modal";

function ModalContent({ onClose, foodName }) {
  const [foodData, setData] = useState(null);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const query = foodName;
        const response = await fetch(
          "https://api.api-ninjas.com/v1/nutrition?query=" +
            encodeURIComponent(query),
          {
            method: "GET",
            headers: {
              "X-Api-Key": "swsXZknrbn8mqxqnQgbV1w==Trw42tVIb21pRajf",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.length > 0 && data[0] !== undefined) {
          setData(data[0]);
        } else {
          throw new Error("Calories not found in the response");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFoodData();
  }, [foodName]);

  return (
    <div>
      <h2>Additional Information for {foodName}</h2>
      {foodData !== null ? (
        <div>
          <p>Calories: {foodData.calories}</p>
          <p>Protein (g): {foodData.protein_g}</p>
          <p>Sugar (g): {foodData.sugar_g}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default function FoodList({ onDrop }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");

  const openModal = (foodName) => {
    setSelectedFood(foodName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hasShownError = useRef(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [foodsByCategory, setFoodsByCategory] = useState({});
  const [newFood, setNewFood] = useState({
    name: "",
    calories: 0,
    category: "",
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("User_token");
        console.log("From Foodlist: ", token);
        const response = await axios.get("http://localhost:8000/api/foods", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const uniqueCategories = [
          ...new Set(response.data.map((food) => food.category)),
        ];

        setCategories(uniqueCategories.sort()); // Sort categories alphabetically

        const foodsGroupedByCategory = uniqueCategories.reduce(
          (acc, category) => {
            acc[category] = response.data.filter(
              (food) => food.category === category
            );
            return acc;
          },
          {}
        );

        setFoodsByCategory(foodsGroupedByCategory);
      } catch (error) {
        console.error("Error fetching foods:", error);
        if (
          error.response &&
          error.response.status === 401 &&
          !hasShownError.current
        ) {
          toast.error("Token has expired!");
          localStorage.clear(); // Clear the expired token
          hasShownError.current = true;
          window.location.href = "/userLogin";
        }
      }
    };

    fetchFoods();
  }, [navigate]);

  const handleDragEnter = (e) => {
    e.preventDefault();

    // Check if the dragged item is from FoodList
    const draggedFoodData = e.dataTransfer.getData("food");

    try {
      // Attempt to parse the JSON data
      const draggedFood = JSON.parse(draggedFoodData);

      // Check if the parsed data is not empty and has the expected structure
      if (draggedFood && draggedFood.category !== undefined) {
        const isFromFoodList = !draggedFood.category;

        // Show the "drag-over" class only if the dragged item is not from FoodList
        if (!isFromFoodList) {
          setIsDragOver(true);
        }
      } else {
        console.warn("Invalid or empty JSON data:", draggedFoodData);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const handleDrop = (e, droppedFood) => {
    e.preventDefault();

    const draggedFood = JSON.parse(e.dataTransfer.getData("food"));

    // Check if the dragged item is not empty, from the same category, and not the same food
    if (
      draggedFood.name !== undefined &&
      draggedFood.calories !== undefined &&
      draggedFood._id !== droppedFood._id
    ) {
      const draggedCategory = draggedFood.category;
      const droppedCategory = droppedFood.category;

      // Check if the dragged item's category matches the current category
      if (draggedCategory === droppedCategory) {
        // Check if the dragged item is from FoodList
        const isFromFoodList = !draggedCategory;

        if (isFromFoodList) {
          // Update the state first and then call onDrop prop
          setFoodsByCategory((prevFoodsByCategory) => {
            const updatedFoodsByCategory = { ...prevFoodsByCategory };

            if (!updatedFoodsByCategory[droppedCategory]) {
              updatedFoodsByCategory[droppedCategory] = [draggedFood];
            } else {
              updatedFoodsByCategory[droppedCategory].push(draggedFood);
            }

            return updatedFoodsByCategory;
          });

          onDrop(draggedFood);
        }
      }
    }

    setIsDragOver(false);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDragStart = (e, food) => {
    e.dataTransfer.setData("food", JSON.stringify(food));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterFoods = (foods) => {
    return (foods || []).filter(
      (food) =>
        (food?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (food?.category || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (food?.calories?.toString() || "").includes(searchTerm)
    );
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    // <div>
    //   <h2 className='font-extrabold'>Food List</h2>
    //   <input className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Search..." onChange={handleSearch} />
    //   {categories.map((category) => (
    //     <div key={category}>
    //       <h3 className='py-2 text-3xl font-bold'>{category}</h3>
    //       <ul
    //         onDragEnter={handleDragEnter}
    //         onDragLeave={handleDragLeave}
    //         onDrop={(e) => handleDrop(e, { name: newFood.name, calories: newFood.calories, category })}
    //       >
    //         {filterFoods(foodsByCategory[category] || []).map((food) => (
    //           <li
    //             key={food._id}
    //             draggable
    //             onDragStart={(e) => handleDragStart(e, food)}
    //             onDragOver={(e) => e.preventDefault()}
    //             onDrop={(e) => handleDrop(e, food)}
    //           >
    //             Food={food.name} | {food.calories} calories
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>
    <>
      <div
        className={`food-list-container ${
          sidebarVisible ? "sidebar-visible" : ""
        }`}
      >
        <div className="toggle-sidebar-icon" onClick={toggleSidebar}>
          {sidebarVisible ? (
            <IoIosArrowDroprightCircle size={32} />
          ) : (
            <IoIosArrowDropleftCircle size={32} />
          )}
        </div>
        <br />
        {sidebarVisible && (
          <div className="sidebar-right">
            <h2 className="font-extrabold">Food List</h2>
            <input
              className="block w-full p-1.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Additional Information Modal"
              style={{
                content: {
                  width: "50%", // Set the width of the modal
                  height: "50%", // Set the height of the modal
                  margin: "auto", // Center the modal horizontally
                },
              }}
            >
              <ModalContent onClose={closeModal} foodName={selectedFood} />
            </Modal>
            {categories.map((category) => (
              <div key={category}>
                <h3 className="py-2 text-3xl font-bold">{category}</h3>
                <ul
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) =>
                    handleDrop(e, {
                      name: newFood.name,
                      calories: newFood.calories,
                      category,
                    })
                  }
                >
                  {filterFoods(foodsByCategory[category] || []).map((food) => (
                    <li
                      key={food._id}
                      className="food-item" // Apply a class to the <li> element for styling
                      draggable
                      onDragStart={(e) => handleDragStart(e, food)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, food)}
                    >
                      <div className="food-info">
                        {" "}
                        {/* Wrapper div for flexbox */}
                        <div>
                          {food.name} | {food.calories} calories
                        </div>
                        <div className="info-icon">
                          <button onClick={() => openModal(food.name)}>
                            <IoInformationCircleSharp />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
