import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';

export default function Add_NewFood() {
    const [newFood, setNewFood] = useState({ name: '', calories: 0, category: '' });
    const [foodsByCategory, setFoodsByCategory] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
      };
    
      const handleAddFood = async () => {
        if (!newFood.name || !newFood.calories || !newFood.category) {
          toast.info('Please fill in all fields.');
          return;
        }
      
        try {
          // Post the new food item to the server
          await axios.post('http://localhost:8000/api/foodPost', newFood);
      
          // Update the state
          setFoodsByCategory((prevFoodsByCategory) => {
            const updatedFoodsByCategory = { ...prevFoodsByCategory };
      
            if (!updatedFoodsByCategory[newFood.category]) {
              updatedFoodsByCategory[newFood.category] = [newFood];
            } else {
              // Create a new object for each food item
              updatedFoodsByCategory[newFood.category] = [
                ...updatedFoodsByCategory[newFood.category],
                { ...newFood }
              ];
            }
      
            return updatedFoodsByCategory;
          });
      
          // Show the toast message only once after updating the state
          toast.success('New Food Item Added');
      
          // Clear the input fields
          setNewFood({ name: '', calories: 0, category: '' });
        } catch (error) {
          console.error('Error adding food:', error.response.data);
        }
      };
  return (
    <div>
        <div>
            <h3 className='text-5xl font-extrabold'>Add New Food</h3>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Name:</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Food Name" type="text" name="name" value={newFood.name} onChange={handleInputChange} required/>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Calories:</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Calories" type="number" name="calories" value={newFood.calories} onChange={handleInputChange} required/>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Category:</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Food Category" type="text" name="category" value={newFood.category} onChange={handleInputChange} required/>
            <button class="mx-5 my-4 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={handleAddFood}>Add Food</button>
        </div>  
    </div>
  )
}
