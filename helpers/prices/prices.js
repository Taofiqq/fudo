import prisma from "../../lib/prisma";

// endpoint to create product prices
export const createProductPrice = async (req, res) => {
  const { price, productId } = req.body;
  const prices = await prisma.price.create({
    data: {
      price,
      productId,
    },
  });
  res.status(201).json(prices);
};

export const getAllPrices = async (req, res) => {
  const prices = await prisma.price.findMany({
    include: {
      product: true,
    },
  });
  res.json({
    status: "success",
    message: "Prices fetched successfully",
    prices,
  });
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

export const updateProductPriceById = (id, price) => {
  const updatedPrice = prisma.price.update({
    where: {
      id: id,
    },
    data: price,
  });
  return updatedPrice;
};

// delete all Prices
export const deleteAllPrices = async (req, res) => {
  const deletedPrices = await prisma.price.deleteMany({});
  res.status(200).json({
    status: "success",
    message: "Prices Deleted Successfully",
    deletedPrices,
  });
};
// endpoint to delete product prices
export const deleteProductPriceById = async (req, res) => {
  const { id } = req.query;
  const productPrice = await prisma.price.delete({
    where: {
      id,
    },
  });
  res.status(201).json({
    message: "Price deleted successfully",
    productPrice,
  });
};
