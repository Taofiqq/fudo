// import {
//   deleteProductPrice,
//   getProductPriceById,
//   updateProductById,
// } from "../../../utils/helper";

import {
  deleteProductPriceById,
  getProductPriceById,
  updateProductPrice,
} from "../../../helpers/prices/prices";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "DELETE") {
    const { id } = req.query;
    const product = await deleteProductPriceById(id);

    res.status(201).json({
      message: "Price deleted successfully",
      product,
    });
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
    const updatedProduct = await updateProductPrice(id, {
      price,
    });
    res.status(200).json({
      status: "success",
      message: "Pricet Updated Successfully",
      updatedProduct,
    });
  }
}
