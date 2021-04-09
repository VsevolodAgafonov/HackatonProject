import React from "react";
import "../styles/style.css";
import "../styles/admin_style.css";
import AdminOlympiadsForm from "./AdminOlympiadsForm.js";
const AdminOlympiads = () => {
  let element = <AdminOlympiadsForm />;
  return (
    <div className="main">
        {element}
      </div>
  );
};

export default AdminOlympiads;
