import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Product = ({ data }) => {
  console.log(data, "data img");
  return (
    <div>
      <h1>{data.title}</h1>
      <Image src={data.productImg} width={200} height={200} alt="product" />
      <p>{data.description}</p>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      data: data,
    },
  };
};
