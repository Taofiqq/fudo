import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useFetchProductById, useProductId } from "../../utils/fetcher";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoaderSpinner from "../../components/LoaderSpinner";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, error } = useFetchProductById(id);
  // console.log(data);

  let productPrice = [];

  data?.product.prices.forEach((price) => {
    productPrice.push(price.price);
  });

  const [price, setPrice] = useState(productPrice[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = productPrice[sizeIndex] - productPrice[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, extra) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(extra.price);
      setExtras((prev) => [...prev, extra]);
    } else {
      changePrice(-extra.price);
      setExtras(extras.filter((item) => item.id !== extra.id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...data.product, quantity, price, extras }));
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <LoaderSpinner />;

  // console.log("data", data.product.prices);
  // console.log("extras", extras);
  console.log("productPrice", productPrice);
  return (
    <div>
      <h1>{data.product.title}</h1>
      <Image
        src={data.product.productImg}
        width={200}
        height={200}
        alt="product"
      />
      <p>{data.product.description}</p>

      <p>Choose the price</p>
      <hr />
      <span>${price}</span>
      <div>
        <div onClick={() => handleSize(0)}>
          <p>Small</p>
        </div>
        <div onClick={() => handleSize(1)}>
          <p>Medium</p>
        </div>
        <div onClick={() => handleSize(2)}>
          <p>Large</p>
        </div>
      </div>
      <hr />

      <p>Chooose additional ingridients</p>

      <div>
        {data.product.extras.map((extra) => (
          <div key={extra.id}>
            <input
              type="checkbox"
              id={extra.text}
              name={extra.text}
              onChange={(e) => handleChange(e, extra)}
            />
            <label htmlFor="">{extra.text}</label>
            {/* <p>{extra.price}</p> */}
          </div>
        ))}
      </div>

      <div>
        <input
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          defaultValue={1}
          name=""
          id=""
        />
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;

// export const getServerSideProps = async ({ params }) => {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/products/${params.id}`
//   );
//   return {
//     props: {
//       fetchedData: data,
//     },
//   };
// };
