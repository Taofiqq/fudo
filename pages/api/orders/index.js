import prisma from "../../../lib/prisma";
import { createOrders } from "../../../utils/helper";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { customer, address, total, status, method } = req.body;

      const orders = await createOrders({
        customer,
        address,
        total,
        status,
        method,
      });

      res.status(201).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "GET") {
    const products = await prisma.order.findMany();
    res.json(products);
  }
}
