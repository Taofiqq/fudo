import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoaderSpinner from "../components/LoaderSpinner";
import { useFetchAllProducts } from "../utils/fetcher";

export default function Home() {
  const { data, error } = useFetchAllProducts();

  if (error)
    return (
      <div>Ooops, Failed to fetch Resource. Dont worry we will be back</div>
    );
  if (!data) return <LoaderSpinner />;
  const { products } = data;
  console.log("products", products);

  return (
    <div>
      <Head>
        <title>Fudo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <Link href={`/product/${product.id}`}>
            <a>
              <Image
                src={product.productImg}
                width={300}
                height={300}
                alt="product"
              />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
