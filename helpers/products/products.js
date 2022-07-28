import prisma from "../../lib/prisma";

// endpoint to get all  products
export const getAllProducts = async (res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        prices: true,
        extras: true,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Products Fetched Successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// endpoint to get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.query;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        prices: true,
        extras: true,
      },
    });
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product Fetched Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// endpoint to create new product
export const createProducts = async (req, res) => {
  try {
    const { title, description, productImg, category } = req.body;
    const createdProduct = await prisma.product.create({
      data: {
        title,
        description,
        productImg,
        category,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      createdProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete all produts

export const deleteAllProducts = async (req, res) => {
  try {
    await prisma.product.deleteMany();
    res.status(200).json({
      status: "success",
      message: "All products deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  endpoint to delete product by id

export const deleteProductById = async (req, res) => {
  const { id } = req.query;
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    deletedProduct,
  });
};

// end point to update product by id

export const updateProductById = async (req, res) => {
  const { id } = req.query;
  const { title, description, productImg } = req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      productImg,
    },
  });
  return res.status(200).json({
    status: "success",
    message: "Product Updated Successfully",
    updatedProduct,
  });
};
