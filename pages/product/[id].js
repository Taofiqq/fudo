import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useProductId } from "../../utils/fetcher";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoaderSpinner from "../../components/LoaderSpinner";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, error } = useSWR(`/api/products/${id}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <LoaderSpinner />;

  console.log(id, "id", "data", data);
  return (
    <div>
      <h1>{data.title}</h1>
      <Image src={data.productImg} width={200} height={200} alt="product" />
      <p>{data.description}</p>
    </div>
  );
};

export default Product;
