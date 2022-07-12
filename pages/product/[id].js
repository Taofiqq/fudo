import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const Product = () => {
  // const fetcher = async (url) => {
  //   const response = await axios.get(url);
  //   return response.data;
  // };
  // const { data, error, params } = useSWR(`/api/products/${params.id}`, fetcher);
  // console.log(data, "data img");
  return (
    <div>
      {/* <h1>{data.title}</h1>
      <Image src={data.productImg} width={200} height={200} alt="product" />
      <p>{data.description}</p> */}

      <h1>heyyy</h1>
    </div>
  );
};

export default Product;

// export const getServerSideProps = async ({ params }) => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const { data } = await axios.get(`${baseUrl}/api/products/${params.id}`);
//   return {
//     props: {
//       data: data,
//     },
//   };
// };
