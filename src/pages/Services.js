import React, { useEffect, useContext } from "react";
import Context from "../components/Context";
import LogInRequest from "../components/LogInRequest";
import ServicesSection from "../components/ServicesSection";
import Footer from "../components/Footer";

export default function Services() {
  const globalData = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {globalData.activeUser !== "" ? <ServicesSection /> : <LogInRequest />}
      <Footer />
    </>
  );
}
