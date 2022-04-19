import React from "react";
import mainbg from "../images/thanks.png";

function LogOutSection() {
  return (
    <div className="mainlogout">
      <div className="main-container">
        <div className="message-xlg-thanks">
          <img
            className="thanks"
            src={mainbg}
            alt="bgimage"
            style={{ width: "200px" }}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h1>Thanks for visit us!</h1>
      </div>
    </div>
  );
}

export default LogOutSection;
