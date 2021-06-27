import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Data from "./components/Data/Data";

function App() {
  return (
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <Data />
      </div>
      <footer>
        <p>&copy; Saif Mujawar {new Date().getFullYear()} </p>
      </footer>
    </div>
  );
}

export default App;
