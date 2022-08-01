import React from "react";
import { useSelector } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import styles from "../../styles/Flutterwave.module.css";

const Flutterwave = ({ createOrder }) => {
  const amount = useSelector((state) => state.cart.total);
  const config = {
    public_key: "FLWPUBK_TEST-ff8cfc219a3d59782d7f38a2c57c93c6-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "joel ugwumadu",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  return (
    // <div>
    <button
      onClick={() => {
        createOrder({
          customer: "Taofiq Aiyelabegan",
          address: "LakeVille NY",
          total: amount,
          status: 1,
          method: 1,
        }),
          handleFlutterPayment({
            callback: (response) => {
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
      }}
      className={styles.btn}
    >
      Payment with Flutterwave
    </button>
    // </div>
  );
};

export default Flutterwave;
