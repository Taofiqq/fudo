import ProductList from "./ProductList";

const ProductCard = ({ data }) => {
  console.log("product", data);
  return (
    <div>
      {data.map((product) => (
        <ProductList key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductCard;
