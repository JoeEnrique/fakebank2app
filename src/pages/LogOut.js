import React, { useEffect } from "react";
import "../styles/LogOut.css";
import LogOutSection from "../components/LogOutSection";
import Footer from "../components/Footer";

export default function LogOut() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LogOutSection />
      <Footer />
    </>
  );
}
