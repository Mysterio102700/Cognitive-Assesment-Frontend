import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { signOut } from "../../Api/login";
import Dashboard from "../../Dashboard/Dashboard";
import "./Sidebar.css";
import Subjects from "../Subjects/Subjects";

const Sidebar = () => {
  const CustomLink = ({ to, text, iconClass }) => (
    <Link to={to} className="nav-link">
      <span className="fa-stack fa-lg pull-left">
        <i className={`fa ${iconClass} fa-stack-1x`}></i>
      </span>{" "}
      {text}
    </Link>
  );

  const [User, setUser] = useState("");

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
  ];
  const Navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    username && setUser(username);
  }, [username]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const logoutHandler = () => {
    console.log("Log out invoked ....");
    signOut();
    setUser("Guest");
    Navigate("/Login");
  };

  return (
    <div>
      <nav
        className={`navbar navbar-default no-margin ${
          isSidebarOpen ? "open" : ""
        } `}
      >
        <div className="navbar-expand-lg fixed-top bg-dark ">
          <button
            type="button"
            className="navbar-toggle collapsed menubar"
            data-toggle="collapse"
            onClick={toggleSidebar}
            id="menu-toggle"
          >
            <FontAwesomeIcon icon={faBars} />{" "}
          </button>
          <a className="navbar-brand" href="#">
            <img
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Bootstrap
          </a>
        </div>
      </nav>

      <div id="wrapper" className={isSidebarOpen ? "toggled" : ""}>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
            <li>{User}</li>
            {User !== "Guest" ? (
              <div className="logout-btn " onClick={logoutHandler}>
                Logout
              </div>
            ) : (
              <div className="logout-btn">
                <Link to="/">
                  <i className="bi bi-arrow-bar-right"></i>Login
                </Link>
              </div>
            )}
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <CustomLink
                  to={menuItem.to}
                  text={menuItem.text}
                  iconClass={menuItem.iconClass}
                />
              </li>
            ))}
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="row">
            <div className="col-lg-12">
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Assessment" element={<Subjects />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
