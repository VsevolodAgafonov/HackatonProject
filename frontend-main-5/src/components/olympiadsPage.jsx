import React from "react";
import "../styles/style.css";
import OlympiadsForm from "./OlympiadsForm.js";
const Olympiads = () => {
  let element = <OlympiadsForm />;
  return (
    <div className="main">
        {element}
      </div>
  );
};

export default Olympiads;
