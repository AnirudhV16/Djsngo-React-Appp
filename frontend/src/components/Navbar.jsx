/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axios";

const api_url = "/choreo-apis/djangoreact/backend/v1";
const Navbar = ({ showContainer, setShowContainer, img }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in
  const baseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : api_url;
  const fullImageUrl = `${baseUrl}${img}`;
  console.log(`urll:${fullImageUrl}`);

  return (
    <nav>
      <Link to="/">
        <h1>App</h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              {/*<Link to="/profile">*/}
              <img
                onClick={() => {
                  setShowContainer(!showContainer);
                }}
                src={fullImageUrl}
                alt="profile image"
              ></img>
              {/*</Link>*/}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
