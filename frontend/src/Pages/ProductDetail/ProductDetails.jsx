import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'; // ShadCN components
import { useProductContext } from '@/contexts/ProductContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const ProductDetails = () => {
    const { productId } = useParams(); // Get productId from the URL
    const { products } = useProductContext(); // Get products from context
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productId && products?.length > 0) {
            const selectedProduct = products.find((item) => String(item._id) === productId);
            setProduct(selectedProduct);
        }
    }, [productId, products]);

    if (!product) {
        return <div className="text-center text-xl py-10">Product not found</div>;
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <Card className="bg-white shadow-lg rounded-lg">
                    {/* Product Image */}
                    <CardHeader>
                        <img
                            src={product.image || 'https://via.placeholder.com/400x300'}
                            alt={product.name}
                            className="w-full h-72 object-cover rounded-t-lg"
                        />
                    </CardHeader>

                    {/* Product Content */}
                    <CardContent className="p-6">
                        <CardTitle className="text-3xl font-bold text-gray-800">{product.name}</CardTitle>
                        <CardDescription className="text-gray-600 mt-4">
                            {product.description || 'No description available for this product.'}
                        </CardDescription>

                        {/* Additional Product Details */}
                        <div className="mt-6 space-y-4">
                            <div>
                                <span className="font-semibold text-gray-800">Price:</span>{' '}
                                <span className="text-lg text-gray-700">{product.price ? `$${product.price}` : 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-800">Category:</span>{' '}
                                <span className="text-lg text-gray-700">{product.category || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-800">Availability:</span>{' '}
                                <span className={`text-lg ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </CardContent>

                    {/* Footer Actions */}
                    <CardFooter className="p-6 flex justify-start">
                        <Button>
                            Book Now
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
};

export default ProductDetails;
