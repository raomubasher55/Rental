  // components/CategoriesSlider/CategoriesSlider.js

  import React from "react";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Link } from "react-router-dom";
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
import { useSubcategoryContext } from "@/contexts/SubCategoryContext";

  const CategoriesSlider = ({ data }) => {
    const {subcategories} = useSubcategoryContext();
    return (
      <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }} navigation={true}>
        {data.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/subcategory/${category._id}`}>
              <div className="p-4 bg-gray-100 rounded-lg cursor-pointer text-center">
                <h3 className="text-lg font-bold">{category.name}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  export default CategoriesSlider;
