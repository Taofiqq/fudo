import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Pizza.module.css";

const Pizza = ({ products }) => {
  return (
    <div className={styles.container}>
      {products
        .filter((product) => product.category === "Pizza")
        .map((product) => (
          <div key={product.id} className={styles.product}>
            <Image
              src={product.productImg}
              width={200}
              height={200}
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

export default Pizza;
