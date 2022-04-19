import React, { useState } from "react";
import "../styles/VisitorSection.css";
//import mainbg from "../images/signature.png";
import mainbg from "../images/registervisit.png";
import bank2 from "../images/bank2.png";
import { Button } from "./Button";
import { firebaseDB } from "../firebase/firebasefakebank";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function VisitorSection() {
  const [showform, setshowform] = useState(true);
  const [visitorname, setVisitorName] = useState("");
  const [visitormessage, setVisitorMessage] = useState("");
  const [nameerror, setnameerror] = useState("");
  const [messageerror, setmessageerror] = useState("");

  const visitorsRef = collection(firebaseDB, "Visitors");
  const registerVisitor = async () => {
    const data = await getDocs(visitorsRef);
    const AllVisitors = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let ID_Size = AllVisitors.length + 1;
    let ID = ID_Size.toString().padStart(5, "0");
    let date = new Date().toLocaleDateString("en-US");
    let time = new Date().toLocaleTimeString("en-US");
    await addDoc(visitorsRef, {
      Date: date,
      Message: visitormessage,
      Name: visitorname,
      Time: time,
      VisitorId: ID,
      CreatedAt: serverTimestamp(),
    });
  };

  function clearallSets() {
    setVisitorName("");
    setVisitorMessage("");
    setnameerror("");
    setmessageerror("");
    setshowform(true);
  }

  const handleSubmit = () => {
    if (validateInput() && validateTextarea()) {
      setshowform(false);
      registerVisitor();
    }
  };

  function validateInput() {
    if (visitorname.length < 3) {
      setnameerror("Please enter a name of at less 3 characters");
      const visitorname_input = document.getElementById("visitorname");
      visitorname_input.focus();
      return false;
    } else {
      setnameerror("");
      return true;
    }
  }

  function validateTextarea() {
    if (visitormessage.length < 3) {
      setmessageerror("Please enter a message of at less 3 characters");
      const visitormessage_input = document.getElementById("visitormessage");
      visitormessage_input.focus();
      return false;
    } else {
      setnameerror("");
      return true;
    }
  }

  const visitorsFrom = (
    <>
      <h2 style={{ color: "yellow" }}>Enter your name and a message</h2>
      <section className="login">
        <div className="loginContainer">
          <label>Visitor Name</label>
          <input
            className="invisible-input"
            id="visitorname"
            type="text"
            required
            value={visitorname}
            onChange={(e) => {
              setVisitorName(e.target.value.toUpperCase());
            }}
          />
          <div className="error">{nameerror}</div>
          <label>Message</label>
          <textarea
            className="invisible-textarea"
            id="visitormessage"
            type="textarea"
            required
            value={visitormessage}
            onChange={(e) => {
              setVisitorMessage(e.target.value);
            }}
          />
          <div className="error">{messageerror}</div>
        </div>
      </section>

      <div className="main-btns">
        <Button
          link="null"
          className="btns"
          buttonStyle="mybtn--outline"
          buttonSize="mybtn--large"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
        <img
          src={bank2}
          className="img-fluid mx-auto d-block"
          alt="bankimage"
          style={{ margin: "40px auto", width: "100px", display: "block" }}
        />
      </div>
    </>
  );

  return (
    <>
      <div className="main-container">
        <img className="bg-image" src={mainbg} alt="bgimage" />
        <h1>
          <span>Register your visit</span>
        </h1>{" "}
      </div>
      <div className="message-lg">
        {showform ? (
          visitorsFrom
        ) : (
          <>
            <h1>THANK YOU</h1>
            <p>{visitorname} for your support</p>
            <Button
              className="btns"
              buttonStyle="mybtn--outline"
              buttonSize="mybtn--large"
              onClick={clearallSets}
            >
              Register your visit AGAIN!
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default VisitorSection;
