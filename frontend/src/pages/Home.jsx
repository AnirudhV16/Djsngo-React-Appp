/** @format */

import React, { useState } from "react";
import Categories from "../components/Categories";
import MenuList from "../components/MenuList";
import Navbar from "../components/Navbar";
import Prof from "../components/Prof";

const Home = ({ showContainer, setShowContainer }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  /*const fetchImage = async () => {
    try {
      const user = await api.get(`user/details/`);
      console.log(`user_details${user}`);
      const imm = user.data.image;
      console.log(`image_id${imm}`);
      const url = `pic/?image_id=${imm}`;
      console.log(`img_urllll${url}`);
      const response = await api.get(url);
      console.log(`response of image${response.data}`);
      console.log(`response of image details url${response.data.image}`);
      console.log("wertyuioasdfghjkcvbnm");
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };*/

  return (
    <div className="home-container">
      <Categories onCategorySelect={setSelectedCategory} />
      <MenuList categoryId={selectedCategory} />
      {/*<Prof showContainer={showContainer} />*/}
    </div>
  );
};

export default Home;
