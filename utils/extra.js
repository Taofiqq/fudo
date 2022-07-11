import prisma from "../lib/prisma";

export const createExtraOptions = async (extras) => {
  const newExtras = await prisma.extra.create({
    data: extras,
  });
  return newExtras;
};
