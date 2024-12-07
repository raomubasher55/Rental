import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

export const fetchAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const fetchProductbyId = async (id) => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  console.log(response);
  
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`);
  return response.data;
};
export const updateProduct = async (productId , data) => {
  const response = await axios.put(`${API_URL}/${productId}`, data);
  return response.data;
};
