import React, { useContext, useEffect } from "react";
import Context from "../Context";
import Footer from "../Footer";

function About() {
  const globalData = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="main-container">
        <video
          className="bg-image"
          src={globalData.video["Qubes.mp4"]}
          autoPlay
          loop
          muted
        />
        <h1>
          <span>About FAKE BANK 2.0</span>
        </h1>
      </div>
      <div className="message-lg" style={{ width: "60vw" }}>
        <p style={{ fontSize: "2.6rem" }}>
          FAKE BANK 2.0 is a fictional financial institution.
        </p>
        <p style={{ fontSize: "1.8rem" }}>
          Was created as a capstone project. Is not intended to create any
          financial transaction.
        </p>
        <p style={{ fontSize: "1.8rem" }}>
          Also, for security purposes, is not recommended use real personal
          information here.
        </p>
        <p style={{ fontSize: "1.8rem" }}>
          The functionality of this work is for mere academic purposes.
        </p>
      </div>
      <img
        src={globalData.allimages["bank2.png"]}
        className="img-fluid mx-auto d-block"
        alt="bankimage"
        style={{ margin: "40px auto", width: "300px", display: "block" }}
      />
      <Footer />
    </>
  );
}

export default About;
