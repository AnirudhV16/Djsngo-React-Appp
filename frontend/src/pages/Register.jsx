/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import api from "../api/axios";

const Register = ({ formData, setFormData }) => {
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImgId, setSelectedImageId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageUrl, imgId) => {
    setSelectedImage(imageUrl);
    setSelectedImageId(imgId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedImgId) {
      setError("Please select a profile image.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/user/register/", {
        username: formData.username,
        password: formData.password,
        image: selectedImgId,
      });

      console.log("API Response:", response);

      // Clear states only if the request is successful
      setSelectedImage(null);
      setSelectedImageId(null);
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        id: "",
      });
      setPhotos([]);
      if (response.status === 201) {
        // Or the appropriate status code
        console.log("Registration successful");
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    async function listt() {
      try {
        const imgs = await api.get("user/profimages/");
        setPhotos(imgs.data);
      } catch (error) {
        setError("Failed to load profile images.");
      }
    }

    listt();
  }, []);

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <h2>Profile Pic Pick....</h2>
      <div className="prof-container">
        {photos.map((image) => (
          <img
            key={image.id}
            src={image.image}
            alt={`Profile ${image.id + 1}`}
            onClick={() => handleImageSelect(image.image, image.id)}
            style={{
              width: "80px",
              height: "80px",
              border:
                selectedImage === image.image
                  ? "3px solid blue"
                  : "1px solid gray",
              cursor: "pointer",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;
