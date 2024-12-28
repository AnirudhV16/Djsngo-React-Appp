/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

const Cart = ({ showContainer, setShowContainer }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. User might not be authenticated.");
          return; // Exit if no token is available
        }

        // Axios instance (`api`) automatically prefixes the base URL, so just use the endpoint
        const response = await api.get("/user/cart/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data); // Successfully fetch and update cart items
      } catch (error) {
        if (error.response) {
          // Error from the server (e.g., 4xx or 5xx status codes)
          console.error("Error fetching cart items:", error.response.data);

          // Check for specific error codes
          if (error.response.status === 401) {
            console.error("Unauthorized: Token might be invalid or expired.");
            // Handle token refresh or redirect to login
          }
        } else if (error.request) {
          // No response from the server
          console.error("No response received from the server:", error.request);
        } else {
          // General Axios request setup error
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchCartItems();
  }, []);
  //console.log(`cartitems${cartItems}`)

  /*const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/user/cart/item/add/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { item_id: itemId },
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };*/

  return (
    <>
      <div className="cart-container">
        <h1>Your Cart</h1>
        <ul>
          {cartItems.map((cartItem) => (
            <li className="cart-item" key={cartItem.id}>
              {cartItem.item.name} - Quantity: {cartItem.quantity} - Price: $
              {cartItem.item.price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Cart;
