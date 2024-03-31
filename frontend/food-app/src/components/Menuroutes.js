import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from '../pages/users/Signup.js'
import Login from '../pages/users/Login.js';
import Add_NewFood from '../pages/admin/Add_NewFood.js';
import MakeMeal from '../pages/users/MakeMeal.js';
import ProtectedRoute from './ProtectedRoute.js';
import ForgotPassword from '../pages/mainSite/ForgotPassword.js';
import Nutritionist_Signup from '../pages/nutritionist/Nutritionist_Signup.js';
import Nutritionist_Login from '../pages/nutritionist/Nutritionist_Login.js';
import Nutritionist_Dashboard from '../pages/nutritionist/Nutritionist_Dashboard.js';
import Nutritionist_Route from './Nutritionist_Route.js';
import Home from '../pages/mainSite/Home.js';
import UserDashboard from '../pages/users/UserDashboard.js';
import UserMainContent from '../pages/users/UserMainContent.js';
import FAQ from '../pages/mainSite/FAQ.js';
import ContactUs from '../pages/mainSite/ContactUs.js';
import Blogs from '../pages/mainSite/Blogs.js';
import Nutritionist_MainContent from '../pages/nutritionist/Nutritionist_MainContent.js';

export default function Menuroutes() {
const isUserLoggedIn = localStorage.getItem('UserLoggedIn');
const isConsultantLoggedIn = localStorage.getItem('Nutritionist_token');
  return (
    <div>
      <Router>
      <Routes>

        {/* User Routes */}
        <Route path='/userLogin' element={isUserLoggedIn=='true'?<UserDashboard/>:<Login/>}/>
        <Route path='/addNewFood' element={<ProtectedRoute/>}>
          <Route path='/addNewFood' element={<Add_NewFood/>}/>
        </Route>
        <Route path='/makeMeal' element={<ProtectedRoute/>}>
          <Route path='/makeMeal' element={<MakeMeal/>}/>
        </Route>
        <Route path='/userDashboard' element={<ProtectedRoute/>}>
          <Route path='/userDashboard' element={<UserDashboard/>}/>
        </Route>
        <Route path='/userMainContent' element={<ProtectedRoute/>}>
          <Route path='/userMainContent' element={<UserMainContent/>}/>
        </Route>

        {/* <Route path="/userBEE" element={<BEE/>} />
        <Route path="/userBMI" element={<BMI/>} /> */}

        <Route path="/" element={<Home/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/userSignup" element={<Signup/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/contactUs" element={<ContactUs/>} />
        <Route path="/blogs" element={<Blogs/>} />



        {/* Consultant Route */}
        <Route path="/consultantSignup" element={<Nutritionist_Signup/>} />
        <Route path='/consultantDashboard' element={<Nutritionist_Route/>}>
          <Route path="/consultantDashboard" element={<Nutritionist_Dashboard/>} />
        </Route>
        <Route path='/consultantMainContent' element={<Nutritionist_Route/>}>
          <Route path="/consultantMainContent" element={<Nutritionist_MainContent/>} />
        </Route>
        <Route path='/consultantLogin' element={isConsultantLoggedIn=='true'?<Nutritionist_Dashboard/>:<Nutritionist_Login/>}/>

      </Routes>
    </Router>
    </div>
  )
}
