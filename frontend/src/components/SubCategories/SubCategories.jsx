import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "@/data/categoriesData";
import Layout from "../layout/Layout";
import { useSubcategoryContext } from "@/contexts/SubCategoryContext";
import { useCategoryContext } from "@/contexts/CategoryContext";

const Subcategories = () => {
    // const {subcategories} = useSubcategoryContext();
    const { categories } = useCategoryContext();
    const { categoryId } = useParams();
    const category = categories?.find((cat) => {
        return cat._id === String(categoryId);
    });

    console.log(category);  // Logs the result of the `find` method

    if (!category) return <p>Category not found!</p>;

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {category?.subcategories?.map((subcategory) => (
                        <Link to={`/products/${subcategory._id}`} key={subcategory.id}>
                            <div className="p-4 bg-gray-100 rounded-lg cursor-pointer">
                                <h3 className="text-lg font-semibold">{subcategory.name}dfsf</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Subcategories;
