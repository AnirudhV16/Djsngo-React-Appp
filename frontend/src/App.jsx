/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Prof from "./components/Prof";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.css";
import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    id: "",
  });
  const [showContainer, setShowContainer] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [img, setImg] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar
        showContainer={showContainer}
        setShowContainer={setShowContainer}
        img={img}
      />
      {isAuthenticated ? (
        <>
          <Prof
            showContainer={showContainer}
            setFormSubmit={setFormSubmit}
            setShowContainer={setShowContainer}
          />
        </>
      ) : (
        <></>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              showContainer={showContainer}
              setShowContainer={setShowContainer}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              formSubmit={formSubmit}
              setFormSubmit={setFormSubmit}
              setImg={setImg}
              img={img}
            />
          }
        />
        <Route
          path="/register"
          element={<Register formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart showContainer={showContainer} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders showContainer={showContainer} />
            </ProtectedRoute>
          }
        />
        {/*<Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Prof
                showContainer={showContainer}
                setFormSubmit={setFormSubmit}
              />
            </ProtectedRoute>
          }
        />*/}
      </Routes>
    </Router>
  );
};

export default App;
