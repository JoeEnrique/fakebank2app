import React, { useEffect } from "react";
//import "../styles/App.css";
import SingUpSection from "../components/SingUpSection";
import Footer from "../components/Footer";

export default function SignUp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SingUpSection />
      <Footer />
    </>
  );
}
