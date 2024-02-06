import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css"  
import Subjects from "./Components/Subjects/Subjects";
import WordSearch from "./Assesments/WordSearch/WordSearch"
import MissingWords from "./Assesments/MissingWords/MissingWords";

const App = () => {
  return (
      <AppRoutes />
      // <WordSearch/>
      // <MissingWords/>
  );
};

export default App;
