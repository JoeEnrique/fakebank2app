import React from "react";
import beepAudioFile from "../../sounds/keybeep.mp3";

function KeyControl(props) {
  const beep = new Audio(beepAudioFile);
  const { key_name, action } = props;

  const playSound = () => {
    beep.play();
  };

  return (
    <>
      <div
        className="keycontrol"
        onClick={() => {
          playSound();
          action(key_name);
        }}
      >
        {key_name}
      </div>
    </>
  );
}

export default KeyControl;
