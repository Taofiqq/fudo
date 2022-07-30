import axios from "axios";
import Image from "next/image";
import styles from "../../styles/Admin.module.css";
import { useFetchAllProducts, useFetchAllOrders } from "../../utils/fetcher";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Admin = ({ products, orders }) => {
  const cart = useSelector((state) => state.cart);
  console.log(cart.products);
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

  return (
    <div className={styles.container}>
      {/* <h1>Manage Customer Orders</h1> */}
      {/* left */}
      <div className={styles.left}>
        <table className={styles.table}>
          <caption className={styles.caption}>Produts</caption>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeadRow}>Image</th>
              <th className={styles.tableHeadRow}>Product Id</th>
              <th className={styles.tableHeadRow}>Title</th>
              <th className={styles.tableHeadRow}>Prices</th>
              <th className={styles.tableHeadRow}>Action</th>
            </tr>
          </thead>
          {cart.products.map((product) => (
            <tbody key={product.id}>
              <tr className={styles.tableBodyRow}>
                <td className={styles.tableBodyData}>
                  <Image
                    src={product.productImg}
                    alt={product.title}
                    width={50}
                    height={50}
                  />
                </td>
                <td className={styles.tableBodyData}>
                  {product.id.slice(0, 10)}...
                </td>
                <td className={styles.tableBodyData}>{product.title}</td>
                <td className={styles.tableBodyData}>{product.price}</td>

                <td className={styles.tableBodyData}>
                  <button className={styles.btn}>Edit</button>
                  <button
                    className={styles.btn}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* right */}

      <div className={styles.right}>
        <table className={styles.table}>
          <caption className={styles.caption}>Orders</caption>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeadRow}>Order Id</th>
              <th className={styles.tableHeadRow}>Customer</th>
              <th className={styles.tableHeadRow}>Total</th>

              <th className={styles.tableHeadRow}>Payment</th>
              <th className={styles.tableHeadRow}>Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          {ordersCount.map((order) => (
            <tbody key={order.id} className={styles.tableBody}>
              <tr className={styles.tableBodyRow}>
                <td className={styles.tableBodyData}>
                  {order.id.slice(0, 10)}...
                </td>
                <td className={styles.tableBodyData}>{order.customer}</td>
                <td className={styles.tableBodyData}>${order.total}</td>

                <td className={styles.tableBodyData}>
                  {order.method === 0 ? (
                    <span>Cash</span>
                  ) : (
                    <span className={styles.payment}>Card Payment</span>
                  )}
                </td>
                <td className={styles.tableBodyData}>
                  <button className={styles.btn}>{status[order.status]}</button>
                  <button
                    className={styles.btn}
                    onClick={() => handleStatus(order.id)}
                  >
                    Next
                  </button>
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
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : `${process.env.NEXT_PUBLIC_VERCEL_ENV}/api`;

  const { data: products } = await axios.get(`${url}/products`);
  const { data: orders } = await axios.get(`${url}/orders`);

  return {
    props: {
      products: products.products,
      orders: orders.orders,
    },
  };
};
