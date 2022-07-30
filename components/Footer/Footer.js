import React from "react";
import styled from "styled-components";
import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <section className={styles.newsletter}>
        <div className={styles.footerLogo}>
          <Image src="/logo.png" width={25} height={25} alt="logo" />
          <h1 className={styles.footerText}>Fudo</h1>
        </div>
        {/* <p>Stay up to Date with our delicious meals</p> */}
        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            Subscribe
          </button>
        </div>
      </section>
      <hr className={styles.line} />

      <section className={styles.footerContent}>
        <div>
          <h2>Fudo Foods</h2>
          <p>Copyright &copy; 2022</p>
          <p
            style={{
              color: "#f35825",
            }}
          >
            Created By Taofiq
          </p>
        </div>

        <div>
          <h2>Products</h2>
          {/* <ul> */}
          <li>Shawarma</li>
          <li>Burgers</li>
          <li>Pizza</li>
          {/* </ul> */}
        </div>
        <div>
          <h2>Company</h2>
          {/* <ul> */}
          <li>About Us</li>
          <li>Blog</li>
          <li>Testimonials</li>
          <li>Pricing</li>
          {/* </ul> */}
        </div>
        <div>
          <h2>Support</h2>
          {/* <ul> */}
          <li>Help Center</li>
          <li>Terms of Service</li>
          <li>Legaal</li>
          <li>Privacy Policy</li>
          {/* </ul> */}
        </div>
        <div>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Socials
          </h2>
          <div className={styles.socialIcons}>
            <li className={styles.icons}>
              <BsLinkedin />
            </li>
            <li className={styles.icons}>
              <BsTwitter />
            </li>
            <li className={styles.icons}>
              <BsFacebook />
            </li>
            <li className={styles.icons}>
              <BsInstagram />
            </li>
            <li className={styles.icons}>
              <BsYoutube />
            </li>
          </div>
        </div>
      </section>

      <p className={styles.copyright}>
        Built with{" "}
        <Link href="https://nextjs.org/">
          <a className={styles.frameworks}>NextJS</a>
        </Link>
        ,{" "}
        <Link href="https://planetscale.com/ ">
          <a className={styles.frameworks}>PlanetScale DB</a>
        </Link>{" "}
        and{" "}
        <Link href="https://www.prisma.io/">
          <a className={styles.frameworks}>Prisma</a>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;

const section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 4rem;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 16rem;
    height: 1.9rem;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    margin-right: 1rem;
  }
  button {
    width: 10rem;
    height: 1.9rem;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    background: #000000;
    color: #ffffff;
  }
`;

export const SocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Socials = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;
