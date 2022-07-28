import {
  createProducts,
  getAllProducts,
  deleteAllProducts,
} from "../../../helpers/products/products";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await createProducts(req, res);
  }

  if (method === "GET") {
    await getAllProducts(res);
  }

  if (method === "DELETE") {
    await deleteAllProducts(req, res);
  }
}
