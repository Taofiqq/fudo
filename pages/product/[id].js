import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, reset } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";
import ButtonSize from "../../components/ButtonSize";
import toast, { Toaster } from "react-hot-toast";

const Product = ({ data }) => {
  const { product } = data;

  const router = useRouter();

  const { id } = router.query;

  let newProductPrice = [];

  product?.prices.map((price) => {
    newProductPrice.push(price.price);
  });
  const [price, setPrice] = useState(newProductPrice[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = newProductPrice[sizeIndex] - newProductPrice[size];
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
    console.log(data.product, quantity, price, extras);
    toast.success("Item Added to cart", {
      position: "top-center",
      duration: 3000,
    });
    reset();
  };

  return (
    <main className={styles.productContainer}>
      <div className={styles.left}>
        <Image
          src={data.product.productImg}
          alt="product"
          width={400}
          height={400}
          quality={100}
          objectFit="cover"
        />
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{data.product.title}</h1>
        <p className={styles.description}>{data.product.description}</p>
        <p className={styles.productSize}>Choose your preferred size</p>
        <div className={styles.size}>
          <div onClick={() => handleSize(0)} className={styles.sizeButton}>
            <ButtonSize text={"Small size"} />
          </div>
          <div onClick={() => handleSize(1)} className={styles.sizeButton}>
            <ButtonSize text={"Medium size"} />
          </div>
          <div onClick={() => handleSize(2)} className={styles.sizeButton}>
            <ButtonSize text={"Large size"} />
          </div>
          <div onClick={() => handleSize(3)} className={styles.sizeButton}>
            <ButtonSize text={" Extra Large size"} />
          </div>
        </div>
        <div className={styles.extraContainer}>
          <p className={styles.ingridients}>Chooose additional Ingridients</p>
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

        <div className={styles.button}>
          <input
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            defaultValue={1}
            className={styles.quantity}
          />
          <button onClick={handleAddToCart} className={styles.buttonCart}>
            Add to Cart
          </button>
        </div>
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

  return {
    props: {
      data: data,
    },
  };
};
