    import React, { createContext, useState, useContext, useEffect } from 'react';
    import { fetchSubcategories as apiFetchSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } from '../api/SubCategoryApi';
    import { toast } from 'react-toastify';

    const SubcategoryContext = createContext();

    const SubcategoryProvider = ({ children }) => {
        const [subcategories, setSubcategories] = useState([]);
        const [loading, setLoading] = useState(false);

        // Fetch all subcategories
        const fetchAllSubcategories = async () => { // Renamed function to avoid conflict
            setLoading(true);
            try {
                const subcategoriesData = await apiFetchSubcategories(); // Call the API function
                setSubcategories(subcategoriesData);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load subcategories');
                setLoading(false);
            }
        };

        // Add a subcategory
        const addSubcategory = async (subcategoryData) => {
            try {
                await createSubcategory(subcategoryData);
                fetchAllSubcategories(); // Refresh the subcategory list after adding
                toast.success('Subcategory added successfully');
            } catch (error) {
                toast.error('Failed to add subcategory');
            }
        };

        // Update a subcategory
        const editSubcategory = async (id, subcategoryData) => {
            try {
                await updateSubcategory(id, subcategoryData);
                fetchAllSubcategories(); // Refresh the subcategory list after updating
                toast.success('Subcategory updated successfully');
            } catch (error) {
                toast.error('Failed to update subcategory');
            }
        };

        // Delete a subcategory
        const removeSubcategory = async (id) => {
            try {
                await deleteSubcategory(id);
                fetchAllSubcategories(); // Refresh the subcategory list after deleting
                toast.success('Subcategory deleted successfully');
            } catch (error) {
                toast.error('Failed to delete subcategory');
            }
        };

        useEffect(() => {
            fetchAllSubcategories(); // Now calling the renamed function
        }, []);

        return (
            <SubcategoryContext.Provider value={{ subcategories, loading, addSubcategory, editSubcategory, removeSubcategory }}>
                {children}
            </SubcategoryContext.Provider>
        );
    };

    const useSubcategoryContext = () => {
        return useContext(SubcategoryContext);
    };

    export { SubcategoryProvider, useSubcategoryContext };
