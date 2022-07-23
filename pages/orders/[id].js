import axios from "axios";
import React from "react";

const Order = ({ data }) => {
  const status = 0;

  const statusClass = (index) => {
    if (index < 1) return "done";
    if (index === 1) return "inProgress";
    if (index > 1) return "Undone";
  };
  console.log(data);
  return (
    <div>
      <h1>Orders here</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {/* {data.orders.map((order) => ( */}
            <tr key={data.order.id}>
              <td>{data.order.id}</td>
              <td>{data.order.customer}</td>
              <td>{data.order.address}</td>
              <td>{data.order.total}</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
          }}
        >
          <div className={statusClass(0)}>
            <span>Payment</span>
          </div>
          <div className={statusClass(1)}>
            <span>Preparing</span>
          </div>
          <div className={statusClass(2)}>
            <span>On the Way</span>
          </div>
          <div className={statusClass(3)}>
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const res = await axios.get(`http://localhost:3000/api/orders/${id}`);
  const data = res.data;
  return { props: { data } };
};
