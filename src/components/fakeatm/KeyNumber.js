import React, { useContext } from "react";
import beepAudioFile from "../../sounds/keybeep.mp3";
import ATMContext from "./ATMContext";

function KeyNumber(props) {
  const beep = new Audio(beepAudioFile);
  const atmData = useContext(ATMContext);
  const { key_name } = props;

  const playSound = () => {
    beep.play();
  };

  const starts = (info) => {
    let generated = "";
    let largo = info.length;
    for (let i = 0; i < largo; i++) {
      generated = generated + "*";
    }
    return generated;
  };

  function processKey() {
    if (atmData.activeCard) {
      //let generated = "";
      let largo = atmData.pin.length;
      if (largo >= 0 && largo <= 3) {
        atmData.setdisplayText(
          "ENTER PIN NUMBER: " + "\r\n" + starts(atmData.pin + key_name)
        );
        atmData.setpin(atmData.pin + key_name);
      } else {
        //Do Nothing
      }
    }
  }

  return (
    <>
      <div
        className="keynumber"
        onClick={() => {
          playSound();
          processKey();
        }}
      >
        {key_name}
      </div>
    </>
  );
}

export default KeyNumber;
