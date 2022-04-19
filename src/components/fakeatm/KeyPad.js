import React, { useContext } from "react";
import KeyNumber from "./KeyNumber";
import KeyControl from "./KeyControl";
import ATMContext from "./ATMContext";

function KeyPad() {
  const atmData = useContext(ATMContext);

  const cancel = () => {
    window.location.reload();
  };

  const clear = () => {
    if (atmData.activeCard) {
      atmData.setpin("");
      atmData.setdisplayText("ENTER PIN NUMBER:");
    }
  };

  const cardMessage = (index) => {
    switch (index) {
      case 0:
        atmData.setdisplayText(
          "You did not pay your bill last month for this card."
        );
        break;
      case 1:
        atmData.setdisplayText(
          `This card is expired.\rWhat are you trying to do?`
        );
        break;
      case 2:
        atmData.setdisplayText(
          "You have 1 million dollars on this card. Go shooping!"
        );
        break;
    }
  };

  const enter = () => {
    if (atmData.activeCard) {
      atmData.setdisplayText(atmData.pin);
      //console.log(atmData.pin);
      if (atmData.pin === atmData.selectedCardPin) {
        atmData.setpin("");
        atmData.setdisplayText("WELCOME !");
        setTimeout(cardMessage, 2000, atmData.cardindex);
      } else {
        atmData.setpin("");
        atmData.setdisplayText("WRONG PIN !!!");
        setTimeout(clear, 2000);
      }
    }
  };

  return (
    <>
      <div className="atm_keypad">
        <div className="keypad_wrap">
          <KeyNumber key_name="1" value="1" />
          <KeyNumber key_name="2" value="2" />
          <KeyNumber key_name="3" value="3" />
          <KeyControl key_name="CANCEL" value="CANCEL" action={cancel} />
          <KeyNumber key_name="4" value="4" />
          <KeyNumber key_name="5" value="5" />
          <KeyNumber key_name="6" value="6" />
          <KeyControl key_name="CLEAR" value="CLEAR" action={clear} />
          <KeyNumber key_name="7" value="7" />
          <KeyNumber key_name="8" value="8" />
          <KeyNumber key_name="9" value="9" />
          <KeyControl key_name="ENTER" value="ENTER" action={enter} />
          <KeyNumber key_name="0" value="0" />
          <KeyNumber key_name="." value="." />
          <KeyNumber key_name="00" value="00" />
        </div>
      </div>
    </>
  );
}

export default KeyPad;
