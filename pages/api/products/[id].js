import { deleteProducts } from "../../../utils/product";

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id);

  const product = await deleteProducts(id);

  res.status(201).json({
    message: "Product deleted successfully",
    product,
  });
}
