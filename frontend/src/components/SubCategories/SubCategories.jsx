import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "@/data/categoriesData";
import Layout from "../layout/Layout";

const Subcategories = () => {
    const { categoryId } = useParams();
    const category = data.find((cat) => cat.id === parseInt(categoryId));

    if (!category) return <p>Category not found!</p>;
    return (
        <Layout>  
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-2 gap-4">
                {category.subcategories.map((subcategory) => (
                    <Link to={`/products/${subcategory.id}`} key={subcategory.id}>
                        <div className="p-4 bg-gray-100 rounded-lg cursor-pointer">
                            <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </Layout>
    );
};

export default Subcategories;
