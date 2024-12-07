import axios from "axios";

const API_URL = "http://localhost:4000/api/subcategories"; // Update API URL if necessary

// Fetch all subcategories
export const fetchSubcategories = async () => {
  const response = await axios.get(API_URL);
  // console.log("Api Response" ,  response)
  return response.data;
};

// Create a new subcategory
export const createSubcategory = async (subcategoryData) => {
  const response = await axios.post(API_URL, subcategoryData);
  return response.data;
};

// Delete a subcategory by ID
export const deleteSubcategory = async (subcategoryId) => {
  const response = await axios.delete(`${API_URL}/${subcategoryId}`);
  return response.data;
};
// Delete a subcategory by ID
export const updateSubcategory = async (subcategoryId, data) => {
  const response = await axios.put(`${API_URL}/${subcategoryId}`, data);
  return response.data;
};
