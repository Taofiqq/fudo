import axios from "axios";
import useSWR from "swr";

// fetcher function

export const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// fetch all products
export const useFetchAllProducts = () => {
  const { data, error } = useSWR("/api/products", fetcher);
  return { data, error };
};

// fetch product bt Id
export const useFetchProductById = (id) => {
  const { data, error } = useSWR(`/api/products/${id}`, fetcher);
  return { data, error };
};

// fetch all orders
export const useFetchAllOrders = () => {
  const { data, error } = useSWR("/api/orders", fetcher);
  return { data, error };
};
