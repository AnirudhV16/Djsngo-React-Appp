/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axios";

const Navbar = ({ showContainer, setShowContainer, img }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in
  const baseUrl = "http://127.0.0.1:8000";
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
