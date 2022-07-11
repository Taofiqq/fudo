import prisma from "../../lib/prisma";
import { createExtraOptions } from "../../utils/extra";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { text, price, productId } = req.body;

      const extra = await createExtraOptions({
        text,
        price,
        productId,
      });

      res.status(201).json(extra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "GET") {
    const extras = await prisma.extra.findMany({
      include: {
        product: true,
      },
    });
    res.json(extras);
  }
}
