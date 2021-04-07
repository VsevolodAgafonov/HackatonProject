import React from "react";
import "../styles/olympiadPage.css";
import OlympiadPage from "./olympiadPage.js";
const Olympiad = () => {
  let element = <OlympiadPage />;
  return (
    <div className="main">
        {element}
      </div>
  );
};

export default Olympiad;
