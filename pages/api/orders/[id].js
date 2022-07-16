import prisma from "../../../lib/prisma";
import { createOrders } from "../../../utils/helper";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    // find order by id

    const { id } = req.query;
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: id,
        },
        // include: {
        //   products: true,
        // },
      });
      res.status(200).json({
        status: "success",
        message: "Order Fetched Successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "PUT") {
  }
  if (method === "DELETE") {
  }
}
