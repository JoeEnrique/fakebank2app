import React from "react";
import { Button } from "./Button";

function SingUpSuccess(props) {
  const { title, newCustomer, setShowMessage } = props;

  return (
    <>
      <div className="message_box message_alert success">
        <h1>{title}</h1>
        <h2>{newCustomer}</h2>
        <p>Welcome to the best online bank</p>
        <h2 style={{ color: "white" }}>FAKE BANK 2.0</h2>
        <Button
          buttonStyle="mybtn--outline"
          onClick={() => {
            setShowMessage(false);
          }}
          className="mybtn-mobile"
        >
          Create an Additional Account
        </Button>
      </div>
      <br />
    </>
  );
}

export default SingUpSuccess;
