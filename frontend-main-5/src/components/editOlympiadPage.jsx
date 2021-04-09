import React from "react";
import "../styles/olympiadPage.css";
import "../styles/addOlympiadPage.css";
import EditOlympiadPage from "./editOlympiadPage.js";
const EditOlympiad = () => {
  let element = <EditOlympiadPage />;
  return (
    <div className="main">
        {element}
      </div>
  );
};

export default EditOlympiad;
