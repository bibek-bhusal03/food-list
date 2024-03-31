import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import Nutritionist_MainContent from "./Nutritionist_MainContent";
import { RiVideoChatLine } from "react-icons/ri";
import Nutritionist_Logout from "../../components/Nutritionist_Logout";
import MeetingRequest from "./MeetingRequest";
import Chat from "../users/Chat";
import { FaRocketchat } from "react-icons/fa";
export default function Nutritionist_Dashboard() {
  const [mini, setMini] = useState(true);

  const [activeContent, setActiveContent] = useState("Main");

  const renderContent = () => {
    switch (activeContent) {
      case "MeetingRequest":
        return <MeetingRequest />;
      case "Chat":
        return <Chat />;
      default:
        return <Nutritionist_MainContent />;
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
        <br />
        <a
          onClick={() => setActiveContent("MeetingRequest")}
          className="sidebar-link"
        >
          <span>
            <i className="material-icons  DashBoardIcon">
              <RiVideoChatLine />
            </i>
            <span className="icon-text">Meeting Requests</span>
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
          <Nutritionist_Logout mini={mini} />
        </div>
      </div>

      <div id="main" className={`content ${mini ? "mini" : ""}`}>
        {renderContent()}
      </div>
    </>
  );
}
