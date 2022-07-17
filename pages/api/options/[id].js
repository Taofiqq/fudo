import {
  deleteExtraOptions,
  getExtraOptionsById,
  updateExtraOptions,
} from "../../../helpers/options/options";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "DELETE") {
    const { id } = req.query;
    const extraOption = await deleteExtraOptions(id);

    res.status(201).json({
      message: "Extra option deleted successfully",
      extraOption,
    });
  }

  if (method === "GET") {
    const { id } = req.query;
    const extraOption = await getExtraOptionsById(id);
    res.json({
      status: "success",
      message: "Extra option fetched successfully",
      extraOption,
    });
  }

  if (method === "PUT") {
    const { id } = req.query;
    const { text, price, productId } = req.body;

    const extraOption = await updateExtraOptions(id, {
      text,
      price,
      productId,
    });
    res.json({
      status: "success",
      message: "Extra option updated successfully",
      extraOption,
    });
  }
}
