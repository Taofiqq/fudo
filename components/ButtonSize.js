import styles from "../styles/Product.module.css";

const ButtonSize = ({ text }) => {
  return <button className={styles.buttonSizes}>{text}</button>;
};

export default ButtonSize;
