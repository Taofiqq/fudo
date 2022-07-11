import prisma from "../lib/prisma";

export const createProductPrice = async (productPrice) => {
  const newProductPrice = await prisma.price.create({
    data: productPrice,
  });
  return newProductPrice;
};
