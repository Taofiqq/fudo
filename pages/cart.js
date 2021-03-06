import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import CashPaymentModal from "../components/CashPaymentModal";
import Flutterwave from "../integrations/Flutterwave/Flutterwave";
import Paystack from "../integrations/Paystack/Paystack";
import styled from "styled-components";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  console.log("cart", cart.products);
  const router = useRouter();
  const createOrder = async (data) => {
    try {
      const response = await axios.post("/api/orders", data);

      if (response.status === 201) {
        router.push(`/orders/${response.data.id}`);
        dispatch(reset());
      }
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const deletedProduct = () => {};

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
                status: 1,
              });
              console.log(details);
            });
          }}
        />
      </>
    );
  };
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Cart Orders
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Extras</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cart.products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div>
                    <Image
                      src={product.productImg}
                      alt="product img"
                      width={50}
                      height={50}
                    />
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <span>
                    {product.extras.map((extra) => (
                      <span key={extra.id}>{extra.text}</span>
                    ))}
                  </span>
                </td>
                <td>{product.quantity}</td>
                <td>{product.price * product.quantity}</td>
                <td>
                  <button onClick={deletedProduct}>Delete Item</button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </div>

      <div
        style={{
          backgroundColor: "tomato",
          width: "20%",
          height: "200px",
        }}
      >
        <h1>Cart Total</h1>

        <div>
          <p>Total: {cart.total}</p>
        </div>

        {open ? (
          <div>
            <button onClick={() => setCash(true)}>Cash Payment</button>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AehXLB7ZfcIRcIhvR76Fneiw1PYfYt27AdoFIxS1OdSll_xh_0JTlmsoJshoe-glOhsybUxtrjTQ-TDa",
                components: "buttons",
                currency: "USD",
                "disable-funding": "credit,card",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
            <Flutterwave />
            <Paystack />
          </div>
        ) : (
          <button onClick={() => setOpen(!false)}>Proceed to Checkout</button>
        )}
      </div>

      {cash && (
        <CashPaymentModal total={cart.total} createOrder={createOrder} />
      )}
    </div>
  );
};

export default Cart;

const TableContainer = styled.table`
  width: 100%;
  margin: 1rem 3rem;
  font-size: 0.9em;
  min-width: 800px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  thead {
    tr {
      background-color: #000000;
      color: #ffffff;
      text-align: left;
      font-weight: bold;
    }
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody {
    tr {
      border-bottom: 1px solid #dddddd;
    }
  }
`;
