import prisma from "../../../lib/prisma";
import {
  createExtraOptions,
  getAllExtras,
  deleteAllExtras,
} from "../../../helpers/options/options";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await createExtraOptions(req, res);
  }

  if (method === "GET") {
    await getAllExtras(res);
  }

  if (method === "DELETE") {
    try {
      await deleteAllExtras(res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
