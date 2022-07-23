import React from "react";
import { useFetchAllOrders } from "../../utils/fetcher";

const Orders = () => {
  const { data, error } = useFetchAllOrders();

  return (
    <div>
      <h1>Here is the whole orders</h1>

      {data?.orders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>
          <p>{order.address}</p>
          <p>{order.customer}</p>
          <p>{order.total}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
