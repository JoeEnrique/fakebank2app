import React, { useEffect, useState } from "react";
import "../styles/fakeatm/atm_mainstyles.css";
import "../styles/fakeatm/keycontrols.css";
import ATMContext from "./fakeatm/ATMContext";
import CardPanel from "./fakeatm/CardPanel";
import Instructions from "./fakeatm/Intructions";
import Display from "./fakeatm/Display";
import KeyPad from "./fakeatm/KeyPad";
import mainbg from "../images/atm.png";

function FakeATM() {
  const [displayText, setdisplayText] = useState("");
  const [pin, setpin] = useState("");
  const allPins = ["4000", "4160", "4375"];
  const [pins, setpins] = useState(allPins);
  const [selectedCard, setselectedCard] = useState("");
  const [selectedCardPin, setselectedCardPin] = useState("");
  const [cardindex, setcardindex] = useState(0);
  const [allcards, setallcards] = useState("");
  const [imagenames, setimagenames] = useState("");

  const [activeCard, setactiveCard] = useState(false);

  useEffect(() => {
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
      });
      return images;
    }

    const images = importAll(
      require.context("../images/fakeatm", false, /\.(png|jpe?g|svg)$/)
    );

    setpins(allPins);
    setallcards(images);
    setimagenames(Object.keys(images));
  }, []);

  return (
    <>
      <ATMContext.Provider
        value={{
          pin,
          setpin,
          displayText,
          setdisplayText,
          selectedCard,
          setselectedCard,
          allcards,
          imagenames,
          pins,
          activeCard,
          setactiveCard,
          selectedCardPin,
          setselectedCardPin,
          cardindex,
          setcardindex,
        }}
      >
        <img className="bg-image" src={mainbg} alt="bgimage" />
        <div className="atm_header">
          <h1>Fake Bank 2.0 ATM</h1>
          <p>Find the message from the Bank</p>
        </div>
        <div className="atm_container">
          <div className="atm_section">
            <Instructions />
            <CardPanel />
          </div>

          <Display />
          <KeyPad />
        </div>
      </ATMContext.Provider>
    </>
  );
}

export default FakeATM;
