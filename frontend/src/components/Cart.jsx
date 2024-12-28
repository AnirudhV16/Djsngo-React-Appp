/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

const Cart = ({ showContainer, setShowContainer }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("user/cart/list/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
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
