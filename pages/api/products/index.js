import { createProducts, getAllProducts } from "../../../utils/product";

// export default async function handler(req, res) {
//   const data = await getAllProducts();
//   res.json(data);
// }

export default async function handlers(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { title, description, productImg } = req.body;

      const product = await createProducts({
        title,
        description,
        productImg,
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "GET") {
    const products = await getAllProducts();
    res.json(products);
  }
}
