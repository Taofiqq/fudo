import React, { useState } from "react";
import styles from "../styles/CashPaymentModal.module.css";

const CashPaymentModal = ({ total, createOrder, setCash }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = () => {
    createOrder({ customer, address, total, status: 0, method: 0 });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          On, Delivery, You will pay $12 after Delivery
        </h1>

        <div className={styles.details}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            placeholder="Taofiq Aiyelabegan"
            onChange={(e) => setCustomer(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.details}>
          <label className={styles.label}>Address:</label>
          <input
            type="text"
            placeholder="LakeVille NY"
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => handleOrder()} className={styles.btn}>
            Order Now
          </button>
          <button onClick={() => setCash(false)} className={styles.btn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashPaymentModal;
