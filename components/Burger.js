import React from "react";
import Image from "next/image";
import styles from "../styles/Burger.module.css";
import Link from "next/link";

const Burger = ({ products }) => {
  return (
    <div className={styles.container}>
      {products
        .filter((product) => product.category === "Burger")
        .map((product) => (
          <div key={product.id} className={styles.product}>
            <Image
              src={product.productImg}
              width={300}
              height={300}
              alt="product"
            />
            <h1>{product.title}</h1>
            <p>{product.description}</p>

            <Link href={`/product/${product.id}`} key={product.id}>
              <button className={styles.button}>Order Now</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Burger;
