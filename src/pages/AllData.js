import React, { useEffect } from "react";
import AllDataSection from "../components/AllDataSection";
import Footer from "../components/Footer";

function AllData() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AllDataSection />
      <Footer />
    </>
  );
}

export default AllData;
