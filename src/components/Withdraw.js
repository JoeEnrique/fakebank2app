import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import Card from "./Card";
import Context from "./Context";
import depositLogo from "../images/services/withdraw.png";
import { firebaseDB } from "../firebase/firebasefakebank";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function Withdraw() {
  const globalData = useContext(Context);
  const myHistory = useHistory();
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [withdrawCompleted, setWithdrawCompleted] = useState(false);
  const transactionsRef = collection(firebaseDB, "Transactions");

  const [withdraw, setWithdraw] = useState(0);
  const [amounterror, setamounterror] = useState("");

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

  //const FILTER = /[0-9\/]+/;
  const FILTER = /[0-9]+/;

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
    setWithdraw("");
  }

  function amountErrorSet(error) {
    setTimeout(() => {
      setamounterror("");
      clearForm();
    }, 6000);
    return setamounterror(error);
  }

  function withdrawAction(event) {
    event.preventDefault();

    if (withdraw <= 0) {
      amountErrorSet(
        "The amount for withdraw should be higher than 0 dollars."
      );
    } else {
      if (withdraw > globalData.activeUserBalance) {
        amountErrorSet(
          "Our apologies!, You are not allowed to withdraw an amount higher than your current balance."
        );
      } else {
        updateCustomer(
          globalData.activeUserDBID,
          Number(globalData.activeUserBalance) - Number(withdraw)
        );
        setWithdrawAmount(withdraw);
        let onlyname = globalData.activeUser.split(" ");
        addTransaction(
          onlyname[0],
          globalData.activeUserID,
          Number(withdraw),
          "",
          "Withdraw"
        );
        globalData.addEventLog(globalData.activeUserID, "Withdraw");
        setWithdrawCompleted(true);
        let emaildone = globalData.activeUseremail;
        globalData.setAppActiveUser(emaildone);
        clearForm();
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

  const withdrawForm = (
    <>
      <div className="form-container">
        <Card
          bgcolor="success"
          header="Withdraw"
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
                value={withdraw}
                onChange={(e) => setWithdraw(e.target.value)}
              />
              <div>
                <div>{amounterror}</div>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={withdrawAction}
              >
                Submit Withdraw
              </button>
            </>
          }
        />
      </div>
    </>
  );

  const withdrawSlip = (
    <>
      <div className="message_box message_alert slip">
        <h2>- Withdraw Slip -</h2>
        <p>
          The amount of {USDollars.format(withdrawAmount)} was withdraw from
          your account
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
          <h1>Withdraw</h1>
        </div>
        <div className="main_message_container">
          <div className="message_box">
            <img src={depositLogo} alt="error" />
          </div>
          <div className="message_separator"></div>
          {withdrawCompleted ? withdrawSlip : withdrawForm}
        </div>
      </div>
    </>
  );
}

export default Withdraw;
