import { deleteOrderById } from "../../../helpers/orders/orders";
import prisma from "../../../lib/prisma";
// import { createOrders } from "../../../helpers/orders/orders";

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

  if (method === "DELETE") {
    // delete order by id
    const { id } = req.query;
    try {
      const order = await deleteOrderById(id);
      res.status(200).json({
        status: "success",
        message: "Order Deleted Successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
