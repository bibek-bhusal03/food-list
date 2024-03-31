import React, { useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"
import axios from "axios";
import { toast } from 'react-toastify'


function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;
  return bmi.toFixed(2);
}

function getBMICategory(bmi) {
    if (bmi < 16.00) {
        return 'Severe Underweight';
      } else if (bmi <= 16.99) {
        return 'Moderate Underweight';
      } else if (bmi <= 18.49) {
        return 'Mild Underweight';
      } else if (bmi < 25.00) {
        return 'Normal range';
      } else if (bmi <= 29.99) {
        return 'Overweight';
      } else if (bmi <= 34.99) {
        return 'Obese I';
      } else if (bmi <= 39.99) {
        return 'Obese II';
      } else if (bmi > 40){
        return 'Obese III';
      } else{
        return 'Not Classified';
      }
}

export default function BMI() {
    const [formData, setFormData] = useState({
        weight: 0,
        height: 0,
      });
      const [bmiResult, setBMIResult] = useState(null);
      const [bmiClassification, setBMIClassification] = useState(null);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.weight || !formData.height) {
          toast.error('Please fill in both weight and height fields');
          return;
        }

        const bmiResult = calculateBMI(formData.weight, formData.height);
        const bmiCategory = getBMICategory(bmiResult);
    
        setBMIResult(bmiResult);
        setBMIClassification(bmiCategory);
        try {
          const userID = localStorage.getItem('UserID'); // Replace with the actual user ID
          axios.put(`http://localhost:8000/api/update-bmi/${userID}`, { bmi: bmiResult });
          console.log("BMI updated successfully");
        } catch (error) {
          console.error("Error updating BMI:", error);
        }
      };
      const restrictedValue = Math.min(Math.max(parseFloat(bmiResult), 0), 40);

      return (
        <div >
          <form onSubmit={handleSubmit}>
            <label>
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Height (cm):
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Calculate BMI</button>
          </form>
          {bmiResult !== null && (
  <div>
    {bmiClassification !== 'Not Classified' ? (
      <ReactSpeedometer
        value={restrictedValue}
        minValue={0}
        maxValue={40}
        segments={8}
        width={450}  // Adjust the width of the speedometer
        height={200}
        customSegmentStops={[0, 16, 17, 18.5, 25, 30, 35, 40]}
        segmentColors={[
          '#bc2020',
          '#d38888',
          '#ffe400',
          '#008137',
          '#ffe400',
          '#d38888',
          '#bc2020',
          '#8a0101',
        ]}
        needleColor={'#000000'}
        textColor={'#666666'}
        segmentLabels={[
          'Severe Underweight',
          'Moderate Underweight',
          'Mild Underweight',
          'Normal range',
          'Overweight',
          'Obese I',
          'Obese II',
          'Obese III',
        ]}
        currentValueText={`BMI: ${bmiResult}, Classification: ${bmiClassification}`}
      />
    ) : (
      <p>Not Classified</p>
    )}
  </div>
)}
        </div>
      );
}
