import React from "react";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import styles from "../../styles/PayStack.module.css";
const Paystack = () => {
  const amount = useSelector((state) => state.cart.total);
  const publicKey = "pk_test_a748cfba66470a15c33ad453162302dc6266bc09";

  const componentProps = {
    publicKey,
    text: "Pay with Paystack",
    amount: amount * 100,
    email: "tao@gmail.com",
  };
  return (
    <div>
      <PaystackButton {...componentProps} className={styles.btn} />
    </div>
  );
};

export default Paystack;
