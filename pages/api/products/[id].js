import {
  deleteProductById,
  getProductById,
  updateProductById,
} from "../../../helpers/products/products";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedProduct = await deleteProductById(id);

      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        deletedProduct,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (method === "GET") {
    const { id } = req.query;

    try {
      const product = await getProductById(id);
      if (!product) {
        res.status(404).json({
          status: "fail",
          message: "Product not found",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Product Fetched Successfully",
        product,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (method === "PUT") {
    const { id } = req.query;
    const { title, description, productImg } = req.body;

    const updatedProduct = await updateProductById(id, {
      title,
      description,
      productImg,
    });

    res.status(200).json({
      status: "success",
      message: "Product Updated Successfully",
      updatedProduct,
    });
  }
}
