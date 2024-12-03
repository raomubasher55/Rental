import React from "react";
import { useParams } from "react-router-dom";
import data from "@/data/categoriesData";
import Layout from "@/components/layout/Layout";

const Products = () => {
    const { subcategoryId } = useParams();
    const subcategory = data
        .flatMap((category) => category.subcategories)
        .find((sub) => sub.id === parseInt(subcategoryId));

    if (!subcategory) return <p>Subcategory not found!</p>;

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Products in {subcategory.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {subcategory.products.map((product) => (
                        <div key={product.id} className="p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="text-green-500">{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Products;
