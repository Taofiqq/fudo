import { deleteProducts } from "../../../utils/helper";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      const product = await deleteProducts(id);

      res.status(200).json({
        status: "success",
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
      include: {
        prices: true,
        extras: true,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Product Fetched Successfully",
      product,
    });
  }

  if (method === "PUT") {
    const { id } = req.query;
    const { title, description, productImg } = req.body;
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        productImg,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Product Updated Successfully",
      product,
    });
  }
}
