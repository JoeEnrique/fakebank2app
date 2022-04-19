import React, { useState, useEffect } from "react";

function Signature() {
  const [periodicClass, setClass] = useState("footer-object");

  useEffect(() => {
    const effecttimer = setTimeout(() => {
      if (periodicClass === "footer-object") {
        setClass("footer-object-animated");
      } else {
        setClass("footer-object");
      }
    }, 7000);
    return () => clearInterval(effecttimer);
  });

  return (
    <div className="signature-container">
      <div className={periodicClass}>
        <p>Capstone Project by Joe Figueroa, Emeritus / MIT</p>
      </div>
    </div>
  );
}

export default Signature;
