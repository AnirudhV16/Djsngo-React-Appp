import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("category/list/").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div className="category-container">
      <h2 onClick={()=>{onCategorySelect(null)}}>Categories</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li className="category-item" key={category.id} onClick={() => onCategorySelect(category.id)}>
            {category.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
