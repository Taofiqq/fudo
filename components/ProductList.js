import Image from "next/image";
import Link from "next/link";

const ProductList = ({ data }) => {
  return (
    <div>
      <p>{data.title}</p>
      <Link href={`/product/${data.id}`}>
        <a>
          <Image src={data.productImg} width={200} height={200} alt="product" />
        </a>
      </Link>
      <p>{data.description}</p>

      <div>
        {data.prices?.map((price) => (
          <div key={price.id}>
            <p>{price.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
