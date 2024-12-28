/** @format */

import React, { useState, useEffect } from "react";
import api from "../api/axios";
import Counter from "./Counter";

const MenuList = ({ categoryId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url = categoryId ? `menu/?category_id=${categoryId}` : "menu/";
    api.get(url).then((response) => {
      setItems(response.data);
    });
  }, [categoryId]);
  //console.log(items)
  const handleAddToCart = (itemId, quantity) => {
    api.post("user/cart/item/add/", { item_id: itemId, quantity }).then(() => {
      alert("Item added to cart!");
    });
  };

  const handleOrderNow = (itemId, quantity) => {
    api.post("user/order/item/add/", { item_id: itemId, quantity }).then(() => {
      alert("Order placed!");
    });
  };

  return (
    <div>
      <h2>Menu Items</h2>
      <ul className="menu-list">
        {items.map((item) => (
          <li className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} style={{ width: 100 }} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <Counter>
              {(quantity) => (
                <>
                  <button onClick={() => handleAddToCart(item.id, quantity)}>
                    Add to Cart
                  </button>
                  <button onClick={() => handleOrderNow(item.id, quantity)}>
                    Order Now
                  </button>
                </>
              )}
            </Counter>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
