import axios from "axios";

const API_URL = "https://full-stack-ecommerce-d1a4.onrender.com/productos"; // tu backend Mongo o JSON

// Traer todos los productos, pasando filtros como query params
export const getProducts = (filters = {}) => {
  return axios.get(API_URL, { params: filters });
};

// Traer un producto por ID
export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};
