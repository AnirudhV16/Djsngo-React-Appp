/** @format */

import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Order = ({ showContainer, setShowContainer }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. User might not be authenticated.");
          return; // Exit if no token is available
        }

        // Axios instance (`api`) automatically applies base URL and other configurations
        const response = await api.get("/user/order/item/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Successfully fetch and set orders
        setOrders(response.data);
      } catch (error) {
        if (error.response) {
          // Error from the server (e.g., 4xx or 5xx status codes)
          console.error("Error fetching orders:", error.response.data);

          // Handle specific status codes if necessary
          if (error.response.status === 401) {
            console.error("Unauthorized: Token might be invalid or expired.");
            // Consider redirecting to login or refreshing the token here
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

    fetchOrders();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await api.get("user/order/item/add/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order", error);
      alert("Order failed.");
    }
  };

  return (
    <>
      <div>
        {/*<button onClick={handlePlaceOrder}>Place Order</button>*/}
        <ul className="orders-container">
          <h1>Your Orders</h1>
          {orders.map((order) => (
            <li className="order-item" key={order.id}>
              Order ID: {order.id} - Total: ${order.total_price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Order;
