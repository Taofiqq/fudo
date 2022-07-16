import React from "react";
import { PaystackButton } from "react-paystack";

const Paystack = () => {
  const publicKey = "pk_test_a748cfba66470a15c33ad453162302dc6266bc09";
  const amount = 1000000;

  const componentProps = {
    publicKey,
    text: "Pay with Paystack",
  };
  return (
    <div>
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default Paystack;
