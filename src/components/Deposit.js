import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import Card from "./Card";
import Context from "./Context";

import depositLogo from "../images/services/deposit.png";

import { firebaseDB } from "../firebase/firebasefakebank";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function Deposit() {
  const globalData = useContext(Context);
  const myHistory = useHistory();
  const [depositAmount, setDepositAmount] = React.useState(0);
  const [depositCompleted, setDepositCompleted] = useState(false);
  const transactionsRef = collection(firebaseDB, "Transactions");

  const [deposited, setDeposited] = useState(0);
  const [amounterror, setamounterror] = useState(" ");

  //Special Formats
  const posiveAmount = {
    color: "white",
    fontWeight: "bold",
  };

  const negativeAmount = {
    color: "red",
    fontWeight: "bold",
  };

  const USDollars = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const FILTER = /[0-9\/]+/;

  const handleKeyPress = (event) => {
    if (!FILTER.test(event.key)) {
      event.preventDefault();
    }
  };

  //Update DB
  const updateCustomer = async (id, balance) => {
    const userDoc = doc(firebaseDB, "Customers", id);
    const newField = { Balance: balance };
    await updateDoc(userDoc, newField);
  };

  function clearForm() {
    setDeposited(0);
  }

  function amountErrorSet(error) {
    setTimeout(() => {
      setamounterror(" ");
      clearForm();
    }, 6000);
    return setamounterror(error);
  }

  function depositAction(event) {
    event.preventDefault();

    if (deposited <= 0) {
      amountErrorSet("The amount for deposit should be higher than 0 dollars.");
    } else {
      if (deposited > 1000000) {
        amountErrorSet(
          "Our apologies!, but this terminal can accept only up to $1,000,000 dollars."
        );
      } else {
        //console.log(deposited);
        updateCustomer(
          globalData.activeUserDBID,
          Number(globalData.activeUserBalance) + Number(deposited)
        );
        setDepositAmount(deposited);
        let onlyname = globalData.activeUser.split(" ");
        addTransaction(
          onlyname[0],
          globalData.activeUserID,
          Number(deposited),
          "",
          "Deposit"
        );
        globalData.addEventLog(globalData.activeUserID, "Deposit");
        setDepositCompleted(true);
        let emaildone = globalData.activeUseremail;
        globalData.setAppActiveUser(emaildone);
        clearForm();
        //setDepositCompleted(false);
      }
    }
  }

  //Set event Logs
  async function addTransaction(
    customername,
    customerid,
    amount,
    description,
    trnstype
  ) {
    const tsndata = await getDocs(transactionsRef);
    const allTransactions = tsndata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let thismoment_TimeStamp = serverTimestamp();
    let date = new Date().toLocaleDateString("en-US");
    let time = new Date().toLocaleTimeString("en-US");

    let trns_ID_Size = allTransactions.length + 1;
    let trns_ID = trns_ID_Size.toString().padStart(7, "0");

    await addDoc(transactionsRef, {
      Amount: amount,
      Date: date,
      Description: description,
      Name: customername,
      Time: time,
      TimeStamp: thismoment_TimeStamp,
      TransactionID: trns_ID,
      TransactionType: trnstype,
      UserId: customerid,
    });

    await globalData.setAppActiveUser(globalData.activeUseremail);
  }

  const depositForm = (
    <>
      <div className="form-container">
        <Card
          bgcolor="warning"
          header="Deposit"
          body={
            <>
              Amount
              <br />
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                onKeyPress={(event) => {
                  handleKeyPress(event);
                }}
                value={deposited}
                onChange={(e) => setDeposited(e.target.value)}
              />
              <div>
                <div className="text-danger">{amounterror}</div>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={depositAction}
              >
                Submit Deposit
              </button>
            </>
          }
        />
      </div>
    </>
  );

  const depositSlip = (
    <>
      <div className="message_box message_alert slip">
        <h2>- Deposit Slip -</h2>
        <p>
          The amount of {USDollars.format(depositAmount)} was deposited on your
          account
        </p>

        <p>Your new account balance is:</p>
        <h1
          style={
            globalData.activeUserBalance > 0 ? posiveAmount : negativeAmount
          }
        >
          {globalData.activeUserBalance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h1>
      </div>
      <div className="message_box message_alert">
        <p>Can I help you with something else?</p>
        <Button
          className="btns"
          buttonStyle="mybtn--outline"
          buttonSize="mybtn--large"
          onClick={() => myHistory.push("/services")}
        >
          Services
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div>
        {" "}
        <div className="subtitle">
          <h1>Deposit</h1>
        </div>
        <div className="main_message_container">
          <div className="message_box">
            <img src={depositLogo} alt="error" />
          </div>
          <div className="message_separator"></div>
          {depositCompleted ? depositSlip : depositForm}
        </div>
      </div>
    </>
  );
}

export default Deposit;
