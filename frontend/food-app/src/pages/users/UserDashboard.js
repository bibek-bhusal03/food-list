import React, { useState } from "react";
import MainContent from "./UserMainContent";
import CalculateBMIContent from "../../components/BMI";
import CalculateBEEContent from "../../components/BEE";
import { IoHome } from "react-icons/io5";
import { IoMdCalculator } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { RiVideoChatLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import CustomizeMealContent from "./MakeMeal";
import Logout from "../../components/Logout";
import UserHeader from "../../components/UserHeader";
import UserMeeting from "./UserMeeting";
import SearchFood from "./SearchFood";
import Chat from "./Chat";
import { FaRocketchat } from "react-icons/fa";

export default function UserDashboard() {
  const [mini, setMini] = useState(true);

  const [activeContent, setActiveContent] = useState("Main");

  const renderContent = () => {
    switch (activeContent) {
      case "SearchFood":
        return <SearchFood />;
      case "CalculateBMI":
        return <CalculateBMIContent />;
      case "CalculateBEE":
        return <CalculateBEEContent />;
      case "CustomizeMeal":
        return <CustomizeMealContent />;
      case "OnlineMeeting":
        return <UserMeeting />;
      case "Chat":
        return <Chat />;
      default:
        return <MainContent />;
    }
  };
  return (
    <>
      <div
        className={`sidebar ${mini ? "mini" : ""}`}
        onMouseEnter={() => setMini(false)}
        onMouseLeave={() => setMini(true)}
      >
        {!mini && (
          <div className="sidebar-header">
            <i className="fa fa-seedling mr-1"></i> Dashboard
          </div>
        )}

        <a onClick={() => setActiveContent("Main")} className="sidebar-link">
          <span>
            <i className="material-icons DashBoardIcon">
              <IoHome />
            </i>
            <span className="icon-text">Main</span>
          </span>
        </a>
        <a
          onClick={() => setActiveContent("SearchFood")}
          className="sidebar-link"
        >
          <span>
            <i className="material-icons  DashBoardIcon">
              <FaSearch />
            </i>
            <span className="icon-text">Food Detail</span>
          </span>
        </a>
        <a
          onClick={() => setActiveContent("CalculateBMI")}
          className="sidebar-link"
        >
          <span>
            <i className="material-icons  DashBoardIcon">
              <IoMdCalculator />
            </i>
            <span className="icon-text">Calculate BMI</span>
          </span>
        </a>
        <a
          onClick={() => setActiveContent("CalculateBEE")}
          className="sidebar-link"
        >
          <span>
            <i className="material-icons  DashBoardIcon">
              <IoMdCalculator />
            </i>
            <span className="icon-text">Calculate BEE</span>
          </span>
        </a>
        <a
          onClick={() => setActiveContent("CustomizeMeal")}
          className="sidebar-link"
        >
          <span>
            <i className="material-icons  DashBoardIcon">
              <GiMeal />
            </i>
            <span className="icon-text">Customize Meal</span>
          </span>
        </a>
        <a
          onClick={() => setActiveContent("OnlineMeeting")}
          className="sidebar-link"
        >
          <span>
            <i className="material-icons  DashBoardIcon">
              <RiVideoChatLine />
            </i>
            <span className="icon-text">Online Meeting</span>
          </span>
        </a>
        <a onClick={() => setActiveContent("Chat")} className="sidebar-link">
          <span>
            <i className="material-icons  ChatIcon">
              <FaRocketchat />
            </i>
            <span className="icon-text">Chats</span>
          </span>
        </a>
        <div className="sidebar-footer">
          <Logout mini={mini} />
        </div>
      </div>

      <div id="main" className={`content ${mini ? "mini" : ""}`}>
        <UserHeader />
        {renderContent()}
      </div>
    </>
  );
}
