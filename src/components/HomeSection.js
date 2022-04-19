import React, { useContext } from "react";
import "../styles/App.css";
import Context from "./Context";
import { Button } from "./Button";
import { useHistory } from "react-router-dom";

function HomeSection() {
  const globalData = useContext(Context);
  const myHistory = useHistory();

  return (
    <>
      <div className="main-container">
        <video
          className="bg-image"
          src={globalData.video["Qubes.mp4"]}
          autoPlay
          loop
          muted
        />
        <h1>
          <div>
            <span>Welcome!</span>
          </div>
        </h1>
        <p>Welcome to Fake Bank 2.0</p>
        <p>Now Redesigned</p>
        <div className="main-btns">
          <Button
            link="null"
            className="btns"
            buttonStyle="mybtn--outline"
            buttonSize="mybtn--large"
            onClick={() => myHistory.push("/sign-up")}
          >
            CREATE YOUR ACCOUNT
          </Button>
        </div>
      </div>
      <div className="message-lg">
        <p>Navigate through this APP using the Navigation Bar on the top</p>
      </div>
      <div className="message-lg">
        <p>Don't have an account? Please, create one with the SignUp button</p>
      </div>
      <div className="message-lg">
        <p>You can find more options on the Services Page</p>
      </div>

      <img
        src={globalData.allimages["bank2.png"]}
        className="img-fluid mx-auto d-block fakebanklogo"
        alt="bankimage"
      />
      <div className="message-lg">
        <p>This is just a demonstration of my work created with React</p>
      </div>
    </>
  );
}

export default HomeSection;
