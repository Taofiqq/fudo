import {
  deleteProductById,
  getProductById,
  updateProductById,
} from "../../../helpers/products/products";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "DELETE") {
    await deleteProductById(req, res);
  }
  if (method === "GET") {
    await getProductById(req, res);
  }

  if (method === "PUT") {
    await updateProductById(req, res);
  }
}
