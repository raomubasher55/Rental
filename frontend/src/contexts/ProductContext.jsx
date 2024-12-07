import React, { createContext, useState, useContext, useEffect } from 'react';
import {fetchProductbyId , fetchAllProducts, createProduct, updateProduct, deleteProduct } from '../api/ProductApi';
import { toast } from 'react-toastify';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsData = await fetchAllProducts();
            setProducts(productsData);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load products');
            setLoading(false);
        }
    };

    // Fetch by id
    const fetchById = async(id)=>{
        try {
            const product = await fetchProductbyId(id);
            setProducts(product);
        } catch (error) {
            toast.error('Failed to load products');
            setLoading(false);
        }
    }


    // Add a product
    const addProduct = async (productData) => {
        try {
           await createProduct(productData);
            fetchProducts(); // Refresh the product list after adding
            toast.success('Product added successfully');
        } catch (error) {
            toast.error('Failed to add product');
        }
    };

    // Update a product
    const editProduct = async (id, productData) => {
        try {
            await updateProduct(id, productData);
            fetchProducts();
            toast.success('Product updated successfully');
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    // Delete a product
    const removeProduct = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts(); // Refresh the product list after deleting
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, editProduct, removeProduct , fetchById }}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => {
    return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
