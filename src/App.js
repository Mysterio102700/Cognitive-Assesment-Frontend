import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css"  
import Subjects from "./Components/Subjects/Subjects";
import WordSearch from "./Assesments/WordSearch/WordSearch"
import MissingWords from "./Assesments/MissingWords/MissingWords";
import Quiz from "./Assesments/Quiz/Quiz";
import Dashboard from "./Admin/AdminDashboard/Dashboard";

const App = () => {
  return (
      <AppRoutes />
      // <Dashboard/>
      // <Quiz/>
      // <WordSearch/>
      // <MissingWords/>
  );
};

export default App;
