import React, { createContext, useContext, useState } from 'react';

const UserCaloriesContext = createContext();

export const UserCaloriesProvider = ({ children }) => {
  const [userCalories, setUserCalories] = useState(1000);

  const decreaseUserCalories = (calories) => {
    setUserCalories((prevCalories) => prevCalories - calories);
  };
  const increaseCalories = (amount) => {
    setUserCalories((prevCalories) => prevCalories + amount);
  };

  return (
    <UserCaloriesContext.Provider value={{ userCalories, decreaseUserCalories, increaseCalories }}>
      {children}
    </UserCaloriesContext.Provider>
  );
};

export const useUserCalories = () => {
  const context = useContext(UserCaloriesContext);
  if (!context) {
    throw new Error('useUserCalories must be used within a UserCaloriesProvider');
  }
  return context;
};
