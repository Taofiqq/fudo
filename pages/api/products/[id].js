import { deleteProducts } from "../../../utils/helper";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      const product = await deleteProducts(id);

      res.status(201).json({
        message: "Product deleted successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (method === "GET") {
    const { id } = req.query;
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    res.json(product);
  }
}
