import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <nav className={styles.container}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image src="/logo.png" width={25} height={25} alt="Fudo Logo" />
          </div>
          <h1 className={styles.logoTitle}>Fudo</h1>
        </div>
      </Link>

      <div className={styles.contents}>
        <ul className={styles.contentList}>
          <li className={styles.contentItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.contentItem}>
            <Link href="/orders">Orders</Link>
          </li>
          <li className={styles.contentItem}>
            <Link href="/admin">Admin</Link>
          </li>
          <li className={styles.contentItem}>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>

        <Link href="/cart">
          <div className={styles.cart}>
            <span className={styles.cartQuantity}>{quantity}</span>
            <AiOutlineShoppingCart className={styles.cartIcon} />
          </div>
        </Link>
      </div>
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <FaHamburger />
      </div>

      <ul
        className={styles.mobileMenu}
        onClick={() => setIsOpen(false)}
        style={{
          right: isOpen ? "0" : "-100%",
        }}
      >
        <li className={styles.menuItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/orders">Orders</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/admin">Admin</Link>
        </li>
        <li className={styles.menuItem}>Contact</li>
        <Link href="/cart">
          <div className={styles.cartMobile}>
            <span className={styles.cartQuantityMobile}>{quantity}</span>
            <AiOutlineShoppingCart className={styles.cartIcon} />
          </div>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
