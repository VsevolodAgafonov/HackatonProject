import React from "react";
import "../styles/olympiadPage.css";
import "../styles/addOlympiadPage.css";
import AddOlympiadPage from "./addOlympiadPage.js";
const AddOlympiad = () => {
  let element = <AddOlympiadPage />;
  return (
    <div className="main">
        {element}
      </div>
  );
};

export default AddOlympiad;
