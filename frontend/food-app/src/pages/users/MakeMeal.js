import React from 'react'
import MealList from '../../components/MealList';
import FoodList from '../../components/FoodList';
import { useState } from 'react';
import { useUserCalories } from '../../components/UserCaloriesContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MakeMeal() {
    const { userCalories, decreaseUserCalories } = useUserCalories();
  const [meals, setMeals] = useState([]);
  // const [userCalories, setUserCalories] = useState(1000);
  const handleFoodDrop = (food) => {
    toast.success(food.name + ' dropped to MealList');
    setMeals([...meals, food]);
    decreaseUserCalories(food.calories);
  };
  return (
    <div className="make-meal-container">
      <div className="meal-list-container">
        <h2 className='text-2xl text-left'>User Calories: {userCalories}</h2>
        <MealList onDrop={handleFoodDrop} meals={meals} />
      </div>
      <div className="food-listContainer">
        <FoodList onDrop={handleFoodDrop} />
      </div>
    </div>
  )
}
