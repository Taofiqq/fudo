import prisma from "../lib/prisma";

// endpoint to create all our products
export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      prices: true,
      extras: true,
    },
  });
  return products;
};

// endpoint to create newproducts

export const createProducts = async (products) => {
  const newProducts = await prisma.product.create({
    data: products,
  });
  return newProducts;
};

//  endpoint to delete products

export const deleteProducts = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return product;
};

// endpoint to create product prices

export const createProductPrice = async (productPrice) => {
  const newProductPrice = await prisma.price.create({
    data: productPrice,
  });
  return newProductPrice;
};

// endpoint to delete product prices
export const deleteProductPrice = async (id) => {
  const productPrice = await prisma.price.delete({
    where: {
      id,
    },
  });
  return productPrice;
};

// endpoint to create product options

export const createExtraOptions = async (extras) => {
  const newExtras = await prisma.extra.create({
    data: extras,
  });
  return newExtras;
};

// endpoint to delete product options
export const deleteExtraOptions = async (id) => {
  const extra = await prisma.extra.delete({
    where: {
      id,
    },
  });
  return extra;
};

// create orders

export const createOrders = async (orders) => {
  const newOrders = await prisma.order.create({
    data: orders,
  });
  return newOrders;
};
