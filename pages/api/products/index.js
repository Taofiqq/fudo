import {
  createProducts,
  getAllProducts,
} from "../../../helpers/products/products";

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

      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "GET") {
    const products = await getAllProducts();
    res.status(200).json({
      status: "success",
      message: "Products Fetched Successfully",
      products,
    });
  }
}
