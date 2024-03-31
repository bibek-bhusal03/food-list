import React from 'react'
import { ImExit } from "react-icons/im";

export default function Nutritionist_Logout({ mini }) {
    const Logout = ()=>{
        localStorage.removeItem('Nutritionist_token');
        localStorage.removeItem('NutritionistLoggedIn');
        localStorage.removeItem('Nutritionist_Username');
        localStorage.removeItem('NutritionistID');
        window.location.href = '/consultantLogin';
    }
  return (
    <div>
      <button className={`logout-button ${mini ? "mini" : ""}`} onClick={Logout}><ImExit /></button>
    </div>
  )
}
