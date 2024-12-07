import axios from "axios";

const API_URL = "http://localhost:4000/api/categories";

export const fetchCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${API_URL}/${categoryId}`);
  return response.data;
};
export const updateCategory = async (categoryId , data) => {
  const response = await axios.put(`${API_URL}/${categoryId}` , data);
  return response.data;
};
