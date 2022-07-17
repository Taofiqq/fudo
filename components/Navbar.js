import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <nav className={styles.container}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo.png" width={50} height={50} alt="Fudo Logo" />
          <h1 className={styles.logoTitle}>Fudo</h1>
        </div>
      </Link>

      <Link href="/cart">
        <div className={styles.contents}>
          <ul className={styles.contentList}>
            <li className={styles.contentItem}>Resturants</li>
            <li className={styles.contentItem}>Products</li>
            <li className={styles.contentItem}>About</li>
            <li className={styles.contentItem}>Contact</li>
          </ul>
          <div className={styles.cart}>
            <AiOutlineShoppingCart className={styles.cartIcon} />
            <div className={styles.cartQuantity}>{quantity}</div>
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
