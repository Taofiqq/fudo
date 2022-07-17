import prisma from "../../../lib/prisma";
import {
  createProductPrice,
  deleteAllPrices,
  getAllPrices,
} from "../../../helpers/prices/prices";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { price, productId } = req.body;

      const productPrice = await createProductPrice({
        price,
        productId,
      });

      res.status(201).json(productPrice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "GET") {
    const products = await getAllPrices();
    res.json({
      status: "success",
      message: "Prices fetched successfully",
      products,
    });
  }

  //delete all prices

  if (method === "DELETE") {
    try {
      const products = await deleteAllPrices();
      res.status(200).json({
        status: "success",
        message: "Prices Deleted Successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
