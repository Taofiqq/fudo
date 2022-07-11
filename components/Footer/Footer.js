import React from "react";
import styled from "styled-components";
import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <FooterContainer>
      <Newsletter>
        <h1>Fudo</h1>
        <p>Stay up to Date with our delicious meals</p>
        <form action="">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </Newsletter>
      <hr />

      <FooterNav>
        <div>
          <h2>Fudo Foods</h2>
          <p>Copyright &copy; 2022</p>
          <p>Created By Taofiq</p>
        </div>

        <div>
          <h2>Products</h2>
          <ul>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
          </ul>
        </div>
        <div>
          <h2>Support</h2>
          <ul>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
            <li>Zinger Burger</li>
          </ul>
        </div>
        <SocialsContainer>
          <h2>Socials</h2>
          <Socials>
            <li>
              <BsLinkedin />
            </li>
            <li>
              <BsTwitter />
            </li>
            <li>
              <BsFacebook />
            </li>
            <li>
              <BsInstagram />
            </li>
            <li>
              <BsYoutube />
            </li>
          </Socials>
        </SocialsContainer>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background: gray;
  width: 100%;
  height: 19rem;
  color: #ffffff;

  hr {
    margin-top: 0.5rem;
  }
`;

const Newsletter = styled.div`
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
const FooterNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 4rem;
  margin-top: 3rem;

  li {
    list-style: none;
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
