import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const useProductId = (id) => {
  const { data, error } = useSWR(`/api/products/${id}`, fetcher);
  return { data, error };
};
