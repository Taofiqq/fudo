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
import styles from "../styles/Cart.module.css";
import ButtonSize from "../components/ButtonSize";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();
  const createOrder = async (data) => {
    try {
      const response = await axios.post("/api/orders", data);

      if (response.status === 201) {
        router.push(`/orders/${response.data.id}`);
        dispatch(reset());
      }
    } catch (error) {
      return error.message;
    }
  };

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
          createOrder={async (data, actions) => {
            const orderId = await actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            });
            return orderId;
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
            });
          }}
        />
      </>
    );
  };
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Cart Orders</h1>
      <div className={styles.cartWrapper}>
        <div className={styles.cartTableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeadData}>Product</th>
                <th className={styles.tableHeadData}>Name</th>
                <th className={styles.tableHeadData}>Price</th>
                <th className={styles.tableHeadData}>Extras</th>
                <th className={styles.tableHeadData}>Quantity</th>
                <th className={styles.tableHeadData}>Total</th>
              </tr>
            </thead>

            <tbody className={styles.tableBody}>
              {cart.products.map((product) => (
                <tr key={product.id} className={styles.tableBodyRow}>
                  <td className={styles.tableBodyData}>
                    <div>
                      <Image
                        src={product.productImg}
                        alt="product img"
                        width={50}
                        height={50}
                      />
                    </div>
                  </td>
                  <td className={styles.tableBodyData}>{product.title}</td>
                  <td className={styles.tableBodyData}>${product.price}</td>
                  <td className={styles.tableBodyData}>
                    <span className={styles.extracont}>
                      {product.extras.map((extra) => (
                        <span key={extra.id} className={styles.extraText}>
                          {extra.text} {","}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className={styles.tableBodyData}>{product.quantity}</td>
                  <td className={styles.tableBodyData}>
                    ${product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.checkoutCard}>
          <h1>Cart Total</h1>

          <p className={styles.checkoutTotal}>Total: ${cart.total}</p>

          {open ? (
            <div className={styles.paymentButtons}>
              <button
                onClick={() => setCash(true)}
                className={styles.checkoutBtn}
              >
                Cash Payment
              </button>
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
              <Flutterwave createOrder={createOrder} />
              <Paystack createOrder={createOrder} />
              <button
                onClick={() => setOpen(false)}
                className={styles.checkoutBtn}
              >
                Close
              </button>
            </div>
          ) : (
            // <ButtonSize text="Proceed to Checkout" />
            <button
              onClick={() => setOpen(!false)}
              className={styles.checkoutBtn}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>

      {cash && (
        <CashPaymentModal
          total={cart.total}
          createOrder={createOrder}
          setCash={setCash}
        />
      )}
    </div>
  );
};

export default Cart;
