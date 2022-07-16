import React, { useState } from "react";

const CashPaymentModal = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  console.log(total, "total");

  const handleOrder = () => {
    createOrder({ customer, address, total, status: 0, method: 0 });
  };
  return (
    <div>
      <div>
        <h1>You will pay $12 after Delivery</h1>

        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Taofiq Aiyelabegan"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="LakeVille NY"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button onClick={handleOrder()}>Order Now</button>
      </div>
    </div>
  );
};

export default CashPaymentModal;
