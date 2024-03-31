import { React, useState, useEffect } from "react";

export default function SearchFood() {
  const [foodData, setFoodData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/nutrition?query=" +
            encodeURIComponent(searchQuery),
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
          setFoodData(data[0]);
        } else {
          throw new Error("Food details not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (searchQuery !== "") {
      fetchFoodData();
    }
  }, [searchQuery]);

  return (
    <div className="container text-center">
      <p className="py-4">
        Explore detailed nutritional information for various food items! Enter
        the name of the food you're curious about below to discover its calorie
        count, carbohydrate content, protein levels, and more.
      </p>
      {/* <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}
      <div class="search__container">
        <input
          class="search__input"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {foodData !== null ? (
        <div>
          <p>Calories: {foodData.calories}</p>
          <p>Protein (g): {foodData.protein_g}</p>
          <p>Sugar (g): {foodData.sugar_g}</p>
        </div>
      ) : (
        <p>{searchQuery !== "" ? "Loading..." : ""}</p>
      )}
    </div>
  );
}
