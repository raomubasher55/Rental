import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSubcategoryContext } from '@/contexts/SubCategoryContext'; // Adjust the import path
import { useProductContext } from '@/contexts/ProductContext'; // Adjust the import path
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'; // Import relevant ShadCN UI components
import { Button } from '@/components/ui/button'; // Import Button component
import Layout from '@/components/layout/Layout';

const SubcategoryDetails = () => {
    const { subcategoryId } = useParams();  // Get subcategoryId from the URL params
    const { subcategories } = useSubcategoryContext();  // Subcategory context
    const { products } = useProductContext();  // Product context

    const [subcategory, setSubcategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (subcategoryId && subcategories?.length > 0) {
            const currentSubcategory = subcategories.find(item => String(item._id) === subcategoryId);
            console.log("Found subcategory: ", currentSubcategory);  // Logging for debugging

            if (currentSubcategory) {
                setSubcategory(currentSubcategory);
                setFilteredProducts(currentSubcategory.products);
            } else {
                console.log("Subcategory not found");
                setSubcategory(null);
                setFilteredProducts([]);
            }
        } else {
            console.log("No subcategoryId or subcategories array is empty");
            setSubcategory(null);
            setFilteredProducts([]);
        }
    }, [subcategoryId, subcategories, products]);

    if (!subcategory) {
        return <div className="text-center text-xl">Subcategory not found</div>;
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-4">{subcategory?.name}</h1>
                <p className="text-center text-lg mb-6">{subcategory?.description}</p>

                {filteredProducts?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts?.map(product => (
                            <Card key={product._id}  className="max-w-sm bg-white shadow-lg hover:shadow-2xl transition duration-300">
                                <CardHeader>
                                    <img
                                        src={product.image || 'https://via.placeholder.com/400x300'}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 mt-2">{product.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <Button>
                                    <Link to={`/product/${product._id}`} variant="primary" size="sm" className="  text-white duration-200">
                                        View Details
                                    </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No products found in this subcategory.</p>
                )}
            </div>
        </Layout>
    );
};

export default SubcategoryDetails;
