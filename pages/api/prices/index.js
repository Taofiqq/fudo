import prisma from "../../../lib/prisma";
import { createProductPrice } from "../../../utils/helper";

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
    const products = await prisma.price.findMany({
      include: {
        product: true,
      },
    });
    res.json(products);
  }
}
