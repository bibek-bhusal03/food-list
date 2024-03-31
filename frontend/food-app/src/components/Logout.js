import React from 'react'
import {useNavigate} from 'react-router-dom';
import { ImExit } from "react-icons/im";
export default function Logout({ mini }) {
    const navigate = useNavigate();
    const Logout = ()=>{
        localStorage.removeItem('User_token');
        localStorage.removeItem('UserLoggedIn');
        localStorage.removeItem('Username');
        localStorage.removeItem('UserID');
        window.location.href = '/userLogin';
    }
  return (
    <div>
      <button className={`logout-button ${mini ? "mini" : ""}`} onClick={Logout}><ImExit /></button>
    </div>
  );
}