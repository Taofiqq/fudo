import prisma from "../../lib/prisma";

// endpoint to get all  products
export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      prices: true,
      extras: true,
    },
  });
  return products;
};

// endpoint to get product by ID
export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      prices: true,
      extras: true,
    },
  });
  return product;
};

// endpoint to create new product
export const createProducts = async (product) => {
  const createdProduct = await prisma.product.create({
    data: product,
  });
  return createdProduct;
};

//  endpoint to delete product by id

export const deleteProductById = async (id) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });
  return deletedProduct;
};

// end point to update product by id

export const updateProductById = async (id, product) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: product,
  });
  return updatedProduct;
};
