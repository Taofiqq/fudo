import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoaderSpinner from "../components/LoaderSpinner";
import { useFetchAllProducts } from "../utils/fetcher";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Sharwarma from "../components/Sharwarma";
import Burger from "../components/Burger";
import Pizza from "../components/Pizza";
import axios from "axios";

export default function Home({ data }) {
  const { products } = data;
  console.log(products);
  // const { data, error } = useFetchAllProducts();

  const [currentTab, setCurrentTab] = useState(1);

  const tabs = [
    {
      id: 1,
      name: "Sharwarma",
    },
    {
      id: 2,
      name: "Burger",
    },
    {
      id: 3,
      name: "Pizza",
    },
    // {
    //   id: 4,
    //   name: "Sushi",
    // },
    // {
    //   id: 5,
    //   name: "Drinks",
    // },
  ];

  // if (error)
  //   return (
  //     <div>Ooops, Failed to fetch Resource. Dont worry we will be back</div>
  //   );
  // if (!data) return <LoaderSpinner />;
  // const { products } = data;

  const handleClick = (id) => {
    setCurrentTab(id);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Fudo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.fudo}>Fudo Fast Foods</span>
        </h1>
        <p className={styles.heroParagraph}>
          Your one stop center to find your quick fast foods
        </p>
        <Link href="#products">
          <button className={styles.heroButton}>Get Started</button>
        </Link>
      </header>

      <section className={styles.main} id="products">
        <h1 className={styles.mainHeader}>Order the food you love</h1>

        <div className={styles.tabsContainer}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={currentTab === tab.id ? styles.activeTab : styles.tab}
              disabled={currentTab === tab.id}
              onClick={() => handleClick(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.productsContainer}>
        {currentTab === 1 && <Sharwarma products={products} />}
        {currentTab === 2 && <Burger products={products} />}
        {currentTab === 3 && <Pizza products={products} />}
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/products"
      : `${process.env.NEXT_PUBLIC_VERCEL_ENV}/api/products`;

  const { data } = await axios.get(url);
  return {
    props: {
      data: data,
    },
  };
};
