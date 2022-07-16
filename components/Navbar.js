import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div>
      <nav>
        <Link href="/">
          <h1>Fudo</h1>
        </Link>

        <Link href="/cart">
          <div>
            <AiOutlineShoppingCart />
            <div>{quantity}</div>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
