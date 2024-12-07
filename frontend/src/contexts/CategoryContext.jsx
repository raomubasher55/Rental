import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCategories , createCategory, updateCategory, deleteCategory } from '../api/CategoryApi';
import { toast } from 'react-toastify';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all categories
    const fetchAllCategories = async () => {
        setLoading(true);
        try {
            const categoriesData = await fetchCategories(); 
            setCategories(categoriesData);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load categories');
            setLoading(false);
        }
    };

    // Add a category
    const addCategory = async (categoryData) => {
        try {
          await createCategory(categoryData);
            fetchAllCategories(); 
            toast.success('Category added successfully');
        } catch (error) {
            toast.error('Failed to add category');
            console.log(error)
        }
    };

    // Update a category
    const editCategory = async (id, categoryData) => {
        try {
            await updateCategory(id, categoryData);
            fetchAllCategories();
            toast.success('Category updated successfully');
        } catch (error) {
            toast.error('Failed to update category');
        }
    };

    // Delete a category
    const removeCategory = async (id) => {
        try {
            await deleteCategory(id);
            fetchAllCategories(); 
            toast.success('Category deleted successfully');
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    useEffect(() => {
        fetchAllCategories(); 
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading, addCategory, editCategory, removeCategory, fetchAllCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategoryContext = () => {
    return useContext(CategoryContext);
};

export { CategoryProvider, useCategoryContext };
