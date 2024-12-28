/** @format */
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Prof({
  showContainer,
  setFormSubmit,
  setShowContainer,
}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    localStorage.removeItem("refresh");
    localStorage.removeItem("imgid");
    localStorage.removeItem("name");
    localStorage.removeItem("imgurl");
    setFormSubmit(false);
    setShowContainer(!showContainer);
    console.log("Logged out!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-wrapper">
      {showContainer && (
        <div className="profile-container">
          <div className="profile-details">
            <h3>{localStorage.getItem("name")}</h3>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
