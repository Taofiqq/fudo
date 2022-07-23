import {
  createProducts,
  getAllProducts,
} from "../../../helpers/products/products";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await createProducts(req, res);
  }

  if (method === "GET") {
    await getAllProducts(res);
  }
}
