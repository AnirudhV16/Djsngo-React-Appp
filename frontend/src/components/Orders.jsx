/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = ({ showContainer, setShowContainer }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/user/order/item/list/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/user/order/item/add/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
