import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import Context from "./Context";

function LogInRequest() {
  const globalData = useContext(Context);
  const myHistory = useHistory();

  const LogInRequestInfo = (
    <>
      <img
        className="bg-image"
        src={globalData.allimages["oops_bg3_d.png"]}
        alt="bgimage"
      />
      <div className="message-lg">
        <h1>Services</h1>
      </div>
      <div className="message-lg">
        <div className="message_box message_alert" style={{ margin: "0 auto" }}>
          <h1>We are sorry!</h1>
          <p>Before giving you full access to our services, please Log In.</p>
          <Button
            className="btns"
            buttonStyle="mybtn--outline"
            buttonSize="mybtn--large"
            onClick={() => myHistory.push("/log-in")}
          >
            Log In
          </Button>
        </div>
      </div>
      <div className="next-container">
        {" "}
        <h1>Does not have an account?</h1>
        <div className="main-btns">
          <Button
            link="null"
            className="btns"
            buttonStyle="mybtn--outline"
            buttonSize="mybtn--large"
            onClick={() => myHistory.push("/sign-up")}
          >
            CREATE YOUR ACCOUNT HERE
          </Button>
        </div>
      </div>
    </>
  );

  return <>{LogInRequestInfo}</>;
}

export default LogInRequest;
