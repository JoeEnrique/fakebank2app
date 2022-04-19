import React, { useEffect } from "react";
import HomeSection from "../components/HomeSection";
import WarningBanner from "../components/WarningBanner";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HomeSection />
      <WarningBanner />
      <Footer />
    </>
  );
}

export default Home;
