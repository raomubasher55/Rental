// App.jsx

import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router';
import AOS from "aos";
import "aos/dist/aos.css";
import { ProductProvider } from "./contexts/ProductContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { ToastContainer } from "react-toastify";
import { SubcategoryProvider } from "./contexts/SubCategoryContext";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <ProductProvider>
        <CategoryProvider>
          <SubcategoryProvider>
            <ToastContainer />
            <Outlet />
          </SubcategoryProvider>
        </CategoryProvider>
      </ProductProvider>

    </>
  );
}

export default App;
