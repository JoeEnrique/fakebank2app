import React from "react";
import "../styles/Cards.css";
import CardItem from "./CardItem";

//Images
import imgbalance from "../images/services/balance.png";
import imgdeposit from "../images/services/deposit.png";
import imgwithdraw from "../images/services/withdraw.png";
import imgtransfers from "../images/services/transfers.png";
import imgfakeatm from "../images/services/fakeatm.png";

import mainbg from "../images/services2.png";

function ServicesSection() {
  const sevicesSection = (
    <>
      <img className="bg-image" src={mainbg} alt="bgimage" />
      <div className="message-xlg successbox">
        <h1>Choose from our variety of services</h1>
      </div>
      <div className="cards">
        <div className="cards__container">
          <ul className="cards__items">
            <CardItem
              src={imgbalance}
              text="Verify the balance of your accounts."
              path="/balance"
            />
            <CardItem
              src={imgdeposit}
              text="Save your money here!"
              path="/deposit"
            />
            <CardItem
              src={imgwithdraw}
              text="Get your money.
              Also, remember to save for later."
              path="/withdraw"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={imgtransfers}
              text="Send money to your friends"
              path="/transfer"
            />
            <CardItem
              src={imgfakeatm}
              text="Have a little fun."
              path="/fake-atm"
            />
          </ul>
        </div>
      </div>
    </>
  );

  return <>{sevicesSection}</>;
}

export default ServicesSection;
