import React from "react";
import { Button } from "./Button";

function LoginSuccess(props) {
  const { activeuser, logoutactions } = props;

  return (
    <>
      <div className="message_box message_alert loginsuccess">
        <h2>Welcome!</h2>
        <h1>{activeuser}</h1>
        <p>Welcome to the best online bank</p>
        <h2 style={{ color: "white" }}>FAKE BANK 2.0</h2>
        <Button
          buttonStyle="mybtn--outline"
          onClick={logoutactions}
          className="mybtn-mobile"
        >
          {"Log Out"}
        </Button>
      </div>
    </>
  );
}

export default LoginSuccess;
