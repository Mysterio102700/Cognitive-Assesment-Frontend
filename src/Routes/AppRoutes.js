import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useRoutes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Auth from "../Auth/Auth";
import Sidebar from "../Components/Sidenav/Sidebar";
import Quiz from "../Assesments/Quiz/Quiz";
import WordSearch from "../Assesments/WordSearch/WordSearch";
import FacultyAuth from "../Admin/FacultyAuth/FacultyAuth";
import MissingWords from "../Assesments/MissingWords/MissingWords";

const AppRoutes = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== null) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [localStorage.getItem("username")]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isUserLoggedIn ? <Sidebar /> : <Auth />} />
        <Route path="/Login" element={<Auth />} />
        <Route path="/Admin" element={<FacultyAuth/>}/>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/wordsearch" element={<WordSearch/>}/>
        <Route path="/MissingWords" element={<MissingWords/>}/>
      </Routes>
      <route path="/Dashboard" element={<Sidebar />} />
      <Sidebar />
    </BrowserRouter>
  );
};

export default AppRoutes;
