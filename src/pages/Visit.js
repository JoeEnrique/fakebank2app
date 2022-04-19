import React, { useEffect } from "react";
import VisitorSection from "../components/VisitorSection";
import Footer from "../components/Footer";

function Visit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <VisitorSection />
      <Footer />
      <div> HOLA VISITOR</div>
    </>
  );
}

export default Visit;
