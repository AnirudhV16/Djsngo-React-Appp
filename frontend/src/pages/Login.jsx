/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import api from "../api/axios";

const Login = ({ formSubmit, setFormSubmit, setImg, img }) => {
  const [formData2, setFormData2] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({ ...prev, [name]: value }));
  };

  const fetchImage = async () => {
    try {
      const user = await api.get(`user/details/`);
      localStorage.setItem("name", user.data.username);
      const imm = user.data.image;
      const url = `pic/?image_id=${imm}`;
      const response = await api.get(url);
      localStorage.setItem("imgurl", response.data.image);
      setImg(localStorage.getItem("imgurl"));
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/user/token/", {
        username: formData2.username,
        password: formData2.password,
      });

      // If successful, store tokens and navigate
      const data = response.data; // Axios automatically parses JSON
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);
      setFormSubmit(true);
      navigate("/");
    } catch (error) {
      // Handle Axios error responses
      if (error.response) {
        // API responded with a status outside the 2xx range
        setError(
          error.response.data?.detail ||
            "Invalid credentials. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        setError("Unable to connect to the server. Please try again later.");
      } else {
        // Something else went wrong during the request setup
        setError("Something went wrong. Please try again later.");
      }
    }
  };
  useEffect(() => {
    if (formSubmit) {
      fetchImage();
      console.log("Updated img state:", img);
    }
  }, [formSubmit]);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData2.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData2.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default Login;
