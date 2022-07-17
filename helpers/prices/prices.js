import prisma from "../../lib/prisma";

// endpoint to create product prices
export const createProductPrice = async (productPrice) => {
  const price = await prisma.price.create({
    data: productPrice,
  });
  return price;
};

export const getAllPrices = async () => {
  const prices = await prisma.price.findMany({
    include: {
      product: true,
    },
  });
  return prices;
};
export const getProductPriceById = (id) => {
  const price = prisma.price.findUnique({
    where: {
      id: id,
    },
    include: {
      product: true,
    },
  });
  return price;
};

export const updateProductPrice = (id, price) => {
  const updatedPrice = prisma.price.update({
    where: {
      id: id,
    },
    data: price,
  });
  return updatedPrice;
};

// delete all Prices
export const deleteAllPrices = async () => {
  const deletedPrices = await prisma.price.deleteMany({});
  return deletedPrices;
};
// endpoint to delete product prices
export const deleteProductPriceById = async (id) => {
  const productPrice = await prisma.price.delete({
    where: {
      id,
    },
  });
  return productPrice;
};
