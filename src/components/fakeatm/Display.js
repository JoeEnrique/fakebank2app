import React, { useContext } from "react";
import ATMContext from "./ATMContext";

function Display() {
  const atmData = useContext(ATMContext);

  return (
    <>
      <div className="atm_display">
        Display
        <div className="display-wrapper">
          <textarea
            className="display-text"
            type="textarea"
            value={atmData.displayText}
            onChange={() => {
              //console.log("On Change");
            }}
          />
          <div className="display-cover" />
        </div>
        <br />
        Selected Card
        <div className="selectedcard">
          <div className="nocard">
            {atmData.activeCard ? "" : "NO CARD SELECTED"}
          </div>
          <div className="sicard">
            {" "}
            <img src={atmData.allcards[atmData.selectedCard]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Display;
