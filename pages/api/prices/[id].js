import { deleteProductPrice } from "../../../utils/helper";

export default async function handler(req, res) {
  const { id } = req.query;
  const product = await deleteProductPrice(id);

  res.status(201).json({
    message: "Price deleted successfully",
    product,
  });
}
