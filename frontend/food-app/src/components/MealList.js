import React, { useState } from "react";
import { useUserCalories } from "./UserCaloriesContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbDragDrop } from "react-icons/tb";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function MealList({ onDrop }) {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { increaseCalories } = useUserCalories();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e, mealType) => {
    e.preventDefault();
    setIsDragOver(false);
    const food = JSON.parse(e.dataTransfer.getData("food"));
    onDrop(food);

    // Choose the appropriate section based on user's choice
    switch (mealType) {
      case "breakfast":
        setBreakfast([...breakfast, food]);
        break;
      case "lunch":
        setLunch([...lunch, food]);
        break;
      case "dinner":
        setDinner([...dinner, food]);
        break;
      default:
        break;
    }
  };

  const handleRemove = (mealType, index) => {
    let updatedMeals = [];

    // Choose the appropriate section based on mealType
    switch (mealType) {
      case "breakfast":
        updatedMeals = [...breakfast];
        setBreakfast(updatedMeals);
        break;
      case "lunch":
        updatedMeals = [...lunch];
        setLunch(updatedMeals);
        break;
      case "dinner":
        updatedMeals = [...dinner];
        setDinner(updatedMeals);
        break;
      default:
        break;
    }

    const removedMeal = updatedMeals.splice(index, 1)[0];
    toast.error(removedMeal.name + " removed from " + mealType);
    increaseCalories(removedMeal.calories);
  };

  const calculateTotalCalories = () => {
    const totalCalories =
      breakfast.reduce((total, meal) => total + meal.calories, 0) +
      lunch.reduce((total, meal) => total + meal.calories, 0) +
      dinner.reduce((total, meal) => total + meal.calories, 0);
    return totalCalories;
  };

  return (
    // <div>
    //   <h2 className="text-5xl font-extrabold">Meal List</h2>
    //   <div className="flex flex-wrap justify-center gap-10">
    //     {/* Breakfast Card */}
    //     <div className="py-6 bg-white rounded-lg shadow-md text-center w-96">
    //       <h3 className="text-3xl font-bold mb-4">Breakfast</h3>
    //       <div
    //         className="text-2xl font-extralight border-dashed border-2 border-gray-300 p-6 mb-4 rounded-md bg-gray-100 text-center"
    //         onDragOver={handleDragOver}
    //         onDragLeave={handleDragLeave}
    //         onDrop={(e) => handleDrop(e, "breakfast")}
    //       >
    //         <TbDragDrop />
    //         Drop Here for Breakfast
    //       </div>
    //       <ul className="text-1xl font-medium">
    //         {breakfast.map((meal, index) => (
    //           <li key={index} className="mb-2 flex items-center">
    //             {meal.name} | {meal.calories} calories
    //             <button
    //               className="ml-4 bg-red-700 hover:bg-red-800 "
    //               onClick={() => handleRemove("breakfast", index)}
    //             >
    //               Remove
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Lunch Card */}
    //     <div className="py-6 bg-white rounded-lg shadow-md text-center w-96">
    //       <h3 className="text-3xl font-bold mb-4">Lunch</h3>
    //       <div
    //         className="text-2xl font-extralight border-dashed border-2 border-gray-300 p-6 mb-4 rounded-md bg-gray-100 text-center"
    //         onDragOver={handleDragOver}
    //         onDragLeave={handleDragLeave}
    //         onDrop={(e) => handleDrop(e, "lunch")}
    //       >
    //         <TbDragDrop />
    //         Drop Here for Lunch
    //       </div>
    //       <ul className="text-1xl font-medium">
    //         {lunch.map((meal, index) => (
    //           <li key={index} className="mb-2 flex items-center">
    //             {meal.name} | {meal.calories} calories
    //             <button
    //               className="ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    //               onClick={() => handleRemove("lunch", index)}
    //             >
    //               Remove
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Dinner Card */}
    //     <div className="py-6 bg-white rounded-lg shadow-md text-center w-96">
    //       <h3 className="text-3xl font-bold mb-4">Dinner</h3>
    //       <div
    //         className="text-2xl font-extralight border-dashed border-2 border-gray-300 p-6 mb-4 rounded-md bg-gray-100 text-center"
    //         onDragOver={handleDragOver}
    //         onDragLeave={handleDragLeave}
    //         onDrop={(e) => handleDrop(e, "dinner")}
    //       >
    //         <TbDragDrop />
    //         Drop Here for Dinner
    //       </div>
    //       <ul className=" font-medium">
    //         {dinner.map((meal, index) => (
    //           <li key={index} className="mb-2 flex items-center">
    //             {meal.name} | {meal.calories} calories
    //             <button
    //               className="ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    //               onClick={() => handleRemove("dinner", index)}
    //             >
    //               Remove
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>

    //   <p>Total Calories: {calculateTotalCalories()}</p>
    // </div>
    <div>
  <h2 className="py-3 text-center">Meal List</h2>
  <div className="mealList-container">
    {/* Breakfast Card */}
    <div className="meal-type py-6 bg-white rounded-lg shadow-md text-center w-96">
      <h3>Breakfast</h3>
      <div className="meal-drop py-4" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, "breakfast")}>
        <TbDragDrop />
        Drop Here for Breakfast
      </div>
      <ul>
        {breakfast.map((meal, index) => (
          <li key={index}>
            <div className="mealInfo">
              <div>
                {meal.name} | {meal.calories} calories
              </div>
              <div className="meal-removeBtn">
                <button className="ml-2" onClick={() => handleRemove("breakfast", index)}><IoIosRemoveCircleOutline/></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Lunch Card */}
    <div className="meal-type py-6 bg-white rounded-lg shadow-md text-center w-96">
      <h3>Lunch</h3>
      <div className="meal-drop py-4" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, "lunch")}>
        <TbDragDrop />
        Drop Here for Lunch
      </div>
      <ul>
        {lunch.map((meal, index) => (
          <li key={index}>
            <div className="mealInfo">
              <div>
                {meal.name} | {meal.calories} calories
              </div>
              <div className="meal-removeBtn">
                <button className="ml-2" onClick={() => handleRemove("lunch", index)}><IoIosRemoveCircleOutline/></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Dinner Card */}
    <div className="meal-type py-6 bg-white rounded-lg shadow-md text-center w-96">
      <h3>Dinner</h3>
      <div className="meal-drop py-4" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, "dinner")}>
        <TbDragDrop />
        Drop Here for Dinner
      </div>
      <ul>
        {dinner.map((meal, index) => (
          <li key={index}>
           <div className="mealInfo">
              <div>
                {meal.name} | {meal.calories} calories
              </div>
              <div className="meal-removeBtn">
                <button className="ml-2" onClick={() => handleRemove("dinner", index)}><IoIosRemoveCircleOutline/></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>

  <p className="py-5">Total Calories: {calculateTotalCalories()}</p>
</div>

  );
}
