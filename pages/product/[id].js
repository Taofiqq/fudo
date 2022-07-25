import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useFetchProductById, useProductId } from "../../utils/fetcher";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoaderSpinner from "../../components/LoaderSpinner";
import { useDispatch } from "react-redux";
import { addProduct, reset } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";
import ButtonSize from "../../components/ButtonSize";
import toast, { Toaster } from "react-hot-toast";

const Product = ({ data }) => {
  const { product } = data;
  console.log(product);
  const router = useRouter();

  const { id } = router.query;

  // const { data, error } = useFetchProductById(id);

  // let productPrice = [];

  // data?.product.prices.forEach((price) => {
  //   productPrice.push(price.price);
  // });

  let newProductPrice = [];

  product?.prices.map((price) => {
    newProductPrice.push(price.price);
  });

  console.log(newProductPrice);

  const [price, setPrice] = useState(newProductPrice[0]);
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
    toast.success("Item Added to cart", {
      position: "top-center",
      duration: 3000,
    });
    reset();
  };

  // if (error) return <div>failed to load</div>;
  // if (!data) return <LoaderSpinner />;

  return (
    <main className={styles.productContainer}>
      <div className={styles.left}>
        <Image
          src={data.product.productImg}
          width={600}
          height={400}
          alt="product"
          objectFit="contain"
          priority
        />
      </div>
      <div className={styles.right}>
        <h1>{data.product.title}</h1>
        <p>{data.product.description}</p>
        <p>Choose your preferred size</p>
        <div className={styles.size}>
          <div onClick={() => handleSize(0)}>
            <ButtonSize text={"Small size"} />
          </div>
          <div onClick={() => handleSize(1)}>
            <ButtonSize text={"Medium size"} />
          </div>
          <div onClick={() => handleSize(2)}>
            <ButtonSize text={"Large size"} />
          </div>
          <div onClick={() => handleSize(3)}>
            <ButtonSize text={" Extra Large size"} />
          </div>
        </div>
        <div className={styles.extraContainer}>
          <p>Chooose additional Ingridients</p>
          <div className={styles.extras}>
            {data.product.extras.map((extra) => (
              <div key={extra.id} className={styles.extra}>
                <input
                  type="checkbox"
                  id={extra.text}
                  name={extra.text}
                  onChange={(e) => handleChange(e, extra)}
                  className={styles.checkbox}
                />
                <button className={styles.extraButton}>
                  {extra.text} +${extra.price}
                </button>
              </div>
            ))}
          </div>
        </div>

        <span className={styles.productPrice}>${price}</span>

        <div>
          <input
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            defaultValue={1}
            className={styles.quantity}
          />
        </div>
        <button onClick={handleAddToCart} className={styles.buttonCart}>
          Add to Cart
        </button>
        <Toaster />
      </div>
    </main>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/api/products/${params.id}`
      : `${process.env.NEXT_PUBLIC_VERCEL_ENV}/api/products/${params.id}`;

  const { data } = await axios.get(url);
  // const { data } = await axios.get(
  //   `http://localhost:3000/api/products/${params.id}`
  // );
  return {
    props: {
      data: data,
    },
  };
};
