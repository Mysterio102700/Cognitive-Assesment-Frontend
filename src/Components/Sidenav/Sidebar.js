import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { signOut } from "../../Api/login";
import Dashboard from "../../Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./Sidebar.css";
import Subjects from "../Subjects/Subjects";
import Feedback from "../Feedback/Feedback";

const Sidebar = () => {
  const CustomLink = ({ to, text, iconClass, isActive }) => (
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      <span className="fa-stack fa-lg pull-left">
        <i className={`fa ${iconClass} fa-stack-1x`}></i>
      </span>{" "}
      {text}
    </Link>
  );

  const [user, setUser] = useState("Guest");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const adminname = localStorage.getItem("adminname");
    setUser(username || adminname || "Guest");
  }, [user, []]);

  const logoutHandler = () => {
    signOut();
    localStorage.removeItem("username");
    localStorage.removeItem("adminname");
    setUser("Guest");
    navigate("/Login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      to: "/Dashboard",
      text: "Home",
      iconClass: "fas fa-home",
    },
    {
      to: "/Assessment",
      text: "Assessment",
      iconClass: "fa-dashboard",
    },
    {
      to: "/Feedback",
      text: "Feedback",
      iconClass: "far fa-comments",
    },
  ];

  return (
    <div id="wrapper" className={`${isSidebarOpen ? "" : "toggled"}`}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <button
          type="button"
          className="navbar-toggler"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          Bootstrap
        </Link>
        {user === "Guest" ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <div className="logout-btn" onClick={logoutHandler}>
                Logout
              </div>
            </li>
          </ul>
        )}
      </nav>

      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">{user}</li>
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <CustomLink
                to={menuItem.to}
                text={menuItem.text}
                iconClass={menuItem.iconClass}
                isActive={location.pathname === menuItem.to}
              />
            </li>
          ))}
        </ul>
      </div>

      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10">
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Assessment" element={<Subjects />} />
                <Route path="/Feedback" element={<Feedback/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
