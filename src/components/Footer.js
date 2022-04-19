import React from "react";
import "../styles/Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import Signature from "./Signature";

import { useHistory } from "react-router-dom";

function Footer() {
  const myHistory = useHistory();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          This is the best online bank, Fake Bank.
        </p>
        <p className="footer-subscription-text">
          Don't leave without registering your visit.
        </p>
        <Button
          className="btns"
          buttonStyle="mybtn--outline"
          buttonSize="mybtn--large"
          onClick={() => {
            myHistory.push("/visitors");
            scrollToTop();
          }}
        >
          REGISTER YOUR VISIT
        </Button>
        <p
          className="footer-subscription-text"
          style={{ color: "yellow", marginTop: "20px" }}
        >
          No need to enter personal information like your real email if you
          don't want to.
        </p>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>FakeBank</h2>
            <div className="linklist">
              <Link className="linklistitem" to="/about">
                About
              </Link>
              <Link className="linklistitem" to="/license">
                License
              </Link>
            </div>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <div className="linklist">
              <Link to="/visitors">Leave a message!</Link>
            </div>
            <div className="linkexternal-wraper">
              <a
                href="https://www.youtube.com/channel/UCrkUkQJ36B9w-9seAlwWESQ"
                target="_blank"
                rel="noopener noreferrer"
                className="linkexternal"
              >
                <i className="fab fa-youtube" />
                <p style={{ fontSize: "0.6rem" }}>Youtube</p>
              </a>
              <a
                href="https://www.linkedin.com/in/jose-figueroa-20a306124/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkexternal"
              >
                <i className="fab fa-linkedin" />
                <p style={{ fontSize: "0.6rem" }}>Linkedin</p>
              </a>
            </div>
          </div>
          <div className="footer-link-items">
            <h2>This Project</h2>
            <div className="linklist">
              <Link to="/project">Project</Link>
              <Link to="/reflection">Reflection</Link>
              <Link to="/resume">Resume</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="footer-logo">
          <Link to="/" className="brand-logo" onClick={scrollToTop}>
            FAKE BANK 2.0
            <i className="fa-solid fa-building-columns"></i>
          </Link>
        </div>
        <small className="website-rights">Copyright &copy; 2022</small>
      </div>
      <Signature />
    </div>
  );
}

export default Footer;
