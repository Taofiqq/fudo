import prisma from "../../../lib/prisma";
import {
  createProductPrice,
  deleteAllPrices,
  getAllPrices,
} from "../../../helpers/prices/prices";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await createProductPrice(req, res);
  }

  if (method === "GET") {
    await getAllPrices(req, res);
  }

  //delete all prices

  if (method === "DELETE") {
    await deleteAllPrices(req, res);
  }
}
