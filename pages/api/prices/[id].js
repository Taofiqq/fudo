import {
  deleteProductPriceById,
  getProductPriceById,
  updateProductPriceById,
} from "../../../helpers/prices/prices";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "DELETE") {
    await deleteProductPriceById(req, res);
  }

  if (method === "GET") {
    const { id } = req.query;
    const product = await getProductPriceById(id);
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
  }

  if (method === "PUT") {
    const { id } = req.query;
    const { price } = req.body;
    const updatedProduct = await updateProductPriceById(id, {
      price,
    });
    res.status(200).json({
      status: "success",
      message: "Pricet Updated Successfully",
      updatedProduct,
    });
  }
}
