import axios from "axios";
import Image from "next/image";
import React from "react";
import { useFetchAllProducts, useFetchAllOrders } from "../../utils/fetcher";

const Admin = ({ products, orders }) => {
  const [productsCount, setProductsCount] = React.useState(products);
  const [ordersCount, setOrdersCount] = React.useState(orders);
  const status = ["Pending", "Processing", "Delivered", "Cancelled"];
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      setProductsCount(productsCount.filter((product) => product.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const handleStatus = async (id) => {
    const item = ordersCount.filter((order) => order.id === id)[0];
    const currentStatus = item.status;

    console.log(currentStatus);
    try {
      const res = await axios.put(`/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrdersCount([
        res.data,
        ...ordersCount.filter((order) => order.id !== id),
      ]);
    } catch (error) {
      throw error;
    }
  };
  console.log(products, orders);
  return (
    <div>
      {/* left */}
      <div>
        <h1>Produts</h1>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {productsCount.map((product) => (
            <tbody key={product.id}>
              <tr>
                <td>
                  <Image
                    src={product.productImg}
                    alt={product.title}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{product.id.slice(0, 6)}</td>
                <td>{product.title}</td>
                <td>
                  {product.prices.map((price) => (
                    <span key={price.id}>{price.price}</span>
                  ))}
                </td>

                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* right */}

      <div>
        <h1>orders</h1>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {ordersCount.map((order) => (
            <tbody key={order.id}>
              <tr>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                </td>
                <td>
                  <button>{status[order.status]}</button>
                </td>
                <td>
                  <button onClick={() => handleStatus(order.id)}>Next</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Admin;

export const getServerSideProps = async (ctx) => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );
  const { data: orders } = await axios.get("http://localhost:3000/api/orders");
  return {
    props: {
      products: products.products,
      orders: orders.orders,
    },
  };
};
