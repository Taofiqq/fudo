import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart.products);
  return (
    <div>
      <h1>Cart Orders</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Extras</th>
              <th>Quantity</th>
              <th>Total</th>
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
                      width={100}
                      height={100}
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
              </tr>
            ))}
          </tbody>
        </table>
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

        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
