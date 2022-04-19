import React from "react";

function Intructions() {
  return (
    <div className="atm_instructions">
      Instructions
      <ul>
        <li>Choose from one of the available credit cards.</li>{" "}
        <li>Your PIN Number will be the first 4 digits of the chosen card.</li>{" "}
        <li>Have fun!</li>
      </ul>
    </div>
  );
}

export default Intructions;
