import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unexpected API error";
    return Promise.reject({ message, status: error.response?.status });
  }
);

export const getOrders = () => api.get("/api/orders");
export const getOrderById = (id) => api.get(`/api/orders/${id}`);
export const createOrder = (data) => api.post("/api/orders", data);
export const updateOrder = (id, data) => api.put(`/api/orders/${id}`, data);
export const deleteOrderById = (id) => api.delete(`/api/orders/${id}`);

export const getProducts = () => api.get("/api/products");