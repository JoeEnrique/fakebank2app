import React, { useState } from "react";
import normal from "../images/google/btn_google_signin_dark_normal.png";
import focus from "../images/google/btn_google_signin_dark_focus.png";
import "../styles/ButtonGoogleLogIn.css";

function ButtonGoogleLogIn(props) {
  const [buttonImage, setbuttonImage] = useState(normal);

  return (
    <>
      <div className="googlebutton">
        <button
          onMouseEnter={() => setbuttonImage(focus)}
          onMouseLeave={() => setbuttonImage(normal)}
          onClick={props.onClick}
        >
          <img src={buttonImage} alt="image" />
        </button>
      </div>
    </>
  );
}

export default ButtonGoogleLogIn;
