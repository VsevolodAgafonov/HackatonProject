import React from "react";
import "../styles/style.css";
import OlimpiadsForm from "./olimpiads_list.js";
const Olimpiads = () => {
  let element = <OlimpiadsForm />;
  return (
    <div className="main">
        {element}
      </div>
  );
};

export default Olimpiads;
