import ProductList from "./ProductList";

const ProductCard = ({ data }) => {
  return (
    <div>
      {data.map((product) => (
        <ProductList key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductCard;
