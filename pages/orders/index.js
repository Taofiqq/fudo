import { useFetchAllOrders } from "../../utils/fetcher";
import styles from "../../styles/Orders.module.css";

const Orders = () => {
  const { data, error } = useFetchAllOrders();

  return (
    <div className={styles.container}>
      <h1>Here is the whole customers orders</h1>

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
