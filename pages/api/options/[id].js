import { deleteExtraOptions } from "../../../utils/helper";

export default async function handler(req, res) {
  const { id } = req.query;
  const extraOption = await deleteExtraOptions(id);

  res.status(201).json({
    message: "Extra option deleted successfully",
    extraOption,
  });
}
