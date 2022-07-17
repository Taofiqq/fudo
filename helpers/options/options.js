import prisma from "../../lib/prisma";

export const getAllExtras = async (res) => {
  const extras = await prisma.extra.findMany({
    include: {
      product: true,
    },
  });
  return res.json({
    status: "success",
    message: "Extras fetched successfully",
    extras,
  });
};

export const getExtraOptionsById = async (id) => {
  const extra = await prisma.extra.findUnique({
    where: {
      id: id,
    },
    include: {
      product: true,
    },
  });
  return extra;
};
// endpoint to create product options
export const createExtraOptions = async (req, res) => {
  const { text, price, productId } = req.body;
  const newExtras = await prisma.extra.create({
    data: {
      text,
      price,
      productId,
    },
  });
  return res.status(201).json({
    status: "success",
    message: "Extra option created successfully",
    newExtras,
  });
};

export const updateExtraOptions = async (id, extras) => {
  const updatedExtras = await prisma.extra.update({
    where: {
      id: id,
    },
    data: extras,
  });
  return updatedExtras;
};

export const deleteAllExtras = async (res) => {
  const extras = await prisma.extra.deleteMany();
  res.status(200).json({
    status: "success",
    message: "Extras Deleted Successfully",
    extras,
  });
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
