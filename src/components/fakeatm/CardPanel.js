import React, { useContext, useState, useEffect } from "react";
import ATMContext from "./ATMContext";

function CardPanel() {
  const atmData = useContext(ATMContext);
  const [cycle, setcycle] = useState(0);

  function doImageCycle(action, sequence) {
    let largo = atmData.imagenames.length;
    switch (action) {
      case "NEXT":
        if (sequence >= largo - 1) {
          setcycle(0);
        } else {
          setcycle(sequence + 1);
        }
        break;

      case "PREVIOUS":
        if (sequence <= 0) {
          setcycle(largo - 1);
        } else {
          setcycle(sequence - 1);
        }
        break;
    }
  }

  const handleSelected = () => {
    atmData.setselectedCard(atmData.imagenames[cycle]);
    atmData.setselectedCardPin(atmData.pins[cycle]);
    atmData.setcardindex(cycle);
    atmData.setpin("");
    atmData.setdisplayText("ENTER PIN NUMBER:");
    atmData.setactiveCard(true);
  };

  return (
    <div className="atm_cardspanel">
      Cards Panel
      <div className="carousel">
        {" "}
        <div className="arrow-container">
          <a
            className="arrow arrow-left"
            title="Previous"
            onClick={() => {
              doImageCycle("PREVIOUS", cycle);
            }}
          ></a>
        </div>
        <img
          src={atmData.allcards[atmData.imagenames[cycle]]}
          alt="cardimage"
          onClick={handleSelected}
        />
        <div className="arrow-container">
          <a
            className="arrow arrow-right"
            title="Next"
            onClick={() => {
              doImageCycle("NEXT", cycle);
            }}
          ></a>
        </div>
      </div>
    </div>
  );
}

export default CardPanel;

/*
      <div className="carousel">
 
        
      </div>

*/
