import prisma from "../../../lib/prisma";
import {
  createOrders,
  deleteManyOrders,
  getAllOrders,
} from "../../../helpers/orders/orders";

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
    const orders = await getAllOrders();

    if (orders.length < 0) {
      res.status(404).json({
        status: "fail",
        message: "No orders found",
      });
    } else {
      res.json({
        status: "success",
        message: "Orders fetched successfully",
        orders,
      });
    }
  }

  // delete all orders
  if (method === "DELETE") {
    try {
      const orders = await deleteManyOrders();
      res.status(200).json({
        status: "success",
        message: "Orders Deleted Successfully",
        orders,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
