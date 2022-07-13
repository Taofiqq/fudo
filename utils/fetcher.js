import axios from "axios";
import useSWR from "swr";

export const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const useFetchAllProducts = () => {
  const { data, error } = useSWR("/api/products", fetcher);
  return { data, error };
};

export const useFetchProductById = (id) => {
  const { data, error } = useSWR(`/api/products/${id}`, fetcher);
  return { data, error };
};
