import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import Context from "./Context";
import "../styles/NavBar.css";

function Navbar() {
  const globalData = useContext(Context);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [linkAction, setLinkAction] = useState("/log-in");
  const [linkText, setLinkText] = useState("Log In");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const myHistory = useHistory();

  useEffect(() => {
    setLogOut();
    showButton();
    showUser();
  }, [globalData.activeUser]);

  function setLogOut() {
    if (globalData.activeUser != "") {
      setLinkAction("/log-out");
      setLinkText("Log Out");
    } else {
      setLinkAction("/log-in");
      setLinkText("Log In");
    }
  }

  //Full Log Out
  function logoutActions() {
    localStorage.clear();
    globalData.addEventLog(globalData.activeUserID, "Log-Out");
    globalData.logOut();
    globalData.clearActiveUser();
    myHistory.push("/log-out");
  }

  const login_Button = (
    <Button
      buttonStyle="mybtn--outline"
      onClick={() => myHistory.push("/log-in")}
      className="mybtn-mobile"
    >
      {"Log In"}
    </Button>
  );

  const logout_Button = (
    <Button
      buttonStyle="mybtn--outline"
      onClick={logoutActions}
      className="mybtn-mobile"
    >
      {"Log Out"}
    </Button>
  );

  function executeLinkOnClick(eventType) {
    closeMobileMenu();
    if (eventType == "Log Out") {
      logoutActions();
    }
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  function showUser() {
    if (globalData.activeUser != "") {
      return "Welcome: " + globalData.activeUser;
    } else {
      return "";
    }
  }

  return (
    <>
      <nav className="mynavbar">
        <div className="mynavbar-logo">
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            FAKE BANK 2.0
            <i className="fa-solid fa-building-columns"></i>
          </Link>
        </div>
        <div className="mynavbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "mynav-menu active" : "mynav-menu"}>
            <li className="mynav-item absolute-center">
              <Link to="/" className="mynav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="mynav-item absolute-center">
              <Link
                to="/services"
                className="mynav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="mynav-item absolute-center">
              <Link
                to="/sign-up"
                className="mynav-links"
                onClick={closeMobileMenu}
              >
                SignUp
              </Link>
            </li>
            <li className="mynav-item absolute-center">
              <Link
                to="/all-data"
                className="mynav-links"
                onClick={closeMobileMenu}
              >
                All Data
              </Link>
            </li>
            <li>
              <Link
                to={linkAction}
                className="mynav-links-mobile"
                onClick={() => {
                  executeLinkOnClick(linkText);
                }}
              >
                {linkText}
              </Link>
            </li>
          </ul>
          {button && (
            <div className="rightbutton">
              <div className="active_user absolute-center">{showUser()}</div>
              {globalData.activeUser != "" ? logout_Button : login_Button}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
