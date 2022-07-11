import prisma from "../lib/prisma";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      prices: true,
      extras: true,
    },
  });
  return products;
};

export const createProducts = async (products) => {
  const newProducts = await prisma.product.create({
    data: products,
  });
  return newProducts;
};

export const deleteProducts = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return product;
};
