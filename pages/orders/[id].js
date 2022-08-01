import axios from "axios";
import styles from "../../styles/Order.module.css";
import { MdPayment } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import { TbBike } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";

const Order = ({ data }) => {
  const status = 0;

  const statusClass = (index) => {
    if (index < 1) return styles.done;
    if (index === 1) return styles.pending;
    if (index > 1) return styles.undone;
  };

  return (
    <div className={styles.orderContainer}>
      <h1>Here is the Details of where your Order will be delivered</h1>

      <table className={styles.orderTable}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeadData}>Order ID</th>
            <th className={styles.tableHeadData}>Customer</th>
            <th className={styles.tableHeadData}>Address</th>
            <th className={styles.tableHeadData}>Total</th>
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {/* {data.orders.map((order) => ( */}
          <tr key={data.order.id} className={styles.tableBodyRow}>
            <td className={styles.tableData}>{data.order.id}</td>
            <td className={styles.tableData}>{data.order.customer}</td>
            <td className={styles.tableData}>{data.order.address}</td>
            <td className={styles.tableData}>${data.order.total}</td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>

      <div className={styles.statusContainer}>
        <div className={statusClass(0)}>
          <span>Payment</span>
          <MdPayment />
        </div>
        <div className={statusClass(1)}>
          <span>Processing</span>
          <GiCookingPot />
        </div>
        <div className={statusClass(2)}>
          <span>On the Way</span>
          <TbBike />
        </div>
        <div className={statusClass(3)}>
          <span>Delivered</span>
          <FiPackage />
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/api/orders/${params.id}`
      : `${process.env.NEXT_PUBLIC_VERCEL_ENV}/api/orders/${id}`;
  const { data } = await axios.get(url);
  return { props: { data } };
};
