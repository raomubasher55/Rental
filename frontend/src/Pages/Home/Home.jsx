// Pages/Home/Home.js

import CategoriesSlider from "@/components/CategoriesSlider/CategoriesSlider";
import HeroSection from "@/components/HeroSection/HeroSection";
import Layout from "@/components/layout/Layout";
import data from "@/data/categoriesData";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <HeroSection />

      {/* Categories Slider */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <CategoriesSlider data={data} />
      </div>
    </Layout>
  );
};

export default Home;
