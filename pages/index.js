import Head from "next/head";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer/Footer";
import useSWR from "swr";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Home() {
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, error } = useSWR("/api/products", fetcher);
  console.log("index", data);
  return (
    <div>
      <Head>
        <title>Fudo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ProductCard data={data} /> */}

      {data?.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <Image
            src={product.productImg}
            width={200}
            height={200}
            alt="product"
          />
        </div>
      ))}
      <Footer />
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const { data } = await axios.get(`${baseUrl}/api/products`);
//   return {
//     props: {
//       products: data,
//     },
//   };
// };
