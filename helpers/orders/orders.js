import prisma from "../../lib/prisma";

// create orders
export const createOrders = async (orders) => {
  const newOrders = await prisma.order.create({
    data: orders,
  });
  return newOrders;
};

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany();
  return orders;
};

export const deleteManyOrders = async () => {
  return prisma.order.deleteMany();
};

export const deleteOrderById = async (id) => {
  const deletedOrder = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  return deletedOrder;
};
