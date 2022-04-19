import React, { useEffect } from "react";
import LogInSection from "../components/LogInSection";
import WarningBanner from "../components/WarningBanner";
import Footer from "../components/Footer";

export default function LogIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LogInSection />
      <WarningBanner />
      <Footer />
    </>
  );
}
