import React from "react";
import "../styles/Warning.css";

function WarningBanner() {
  const warning =
    "This is my capstone project from Emeritus / MIT. It is not intended to make real financial transactions.";
  return <div className="warning_box">{warning}</div>;
}

export default WarningBanner;
