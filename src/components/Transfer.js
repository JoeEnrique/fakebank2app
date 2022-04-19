import React, { useContext, useEffect, useState } from "react";
import "../styles/Messages.css";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";

import Card from "./Card";
import Context from "./Context";

import transfersLogo from "../images/services/transfers.png";

import { firebaseDB } from "../firebase/firebasefakebank";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Transfer() {
  const globalData = useContext(Context);
  const myHistory = useHistory();
  const transactionsRef = collection(firebaseDB, "Transactions");

  const [showSlip, setshowSlip] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transferAmount, setTransferAmount] = useState(0);

  const [selectedName, setselectedName] = useState("Select one");
  const [selectedEmail, setselectedEmail] = useState("noemail");
  const [selectedBalance, setselectedBalance] = useState(0);
  const [selectedId, setselectedId] = useState("");
  const [selectedDBID, setselectedDBID] = useState("");

  const [renderoptions, setrenderoptions] = useState("");
  const [amounterror, setamounterror] = useState(" ");
  const [selectederror, setselectederror] = useState(" ");

  const customersRef = collection(firebaseDB, "Customers");
  const selectCustomer = document.getElementById("selectedcustomers");

  //Special Formats
  const formstyle = {
    textAlign: "left",
  };

  const posiveAmount = {
    color: "white",
  };

  const negativeAmount = {
    color: "red",
  };

  const USDollars = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const FILTER = /[0-9]+/;
  const handleKeyPress = (event) => {
    if (!FILTER.test(event.key)) {
      event.preventDefault();
    }
  };

  const [balanceStyle, setbalanceStalye] = useState(negativeAmount);

  useEffect(() => {
    const getCustomers = async () => {
      let names = [];
      names.push({
        customer: "Select one",
        email: "noemail",
        balance: 0,
        customerid: "",
        dbid: "",
      });
      const data = await getDocs(customersRef);
      const getAllCustomers = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      getAllCustomers.map((customer) => {
        //console.log(globalData.activeUseremail);
        if (customer.eMail !== globalData.activeUseremail) {
          names.push({
            customer: customer.Name + " " + customer.LastName,
            email: customer.eMail,
            balance: customer.Balance,
            customerid: customer.UserId,
            dbid: customer.id,
          });
        }
      });
      setrenderoptions(names.map(renderCustomers));
    };
    getCustomers();
  }, [globalData.activeUser, showConfirmation]);

  const renderCustomers = (user, index) => {
    return (
      <option
        key={index}
        value={
          user.customer +
          "-" +
          user.email +
          "-" +
          user.balance +
          "-" +
          user.customerid +
          "-" +
          user.dbid
        }
      >
        {user.customer}
      </option>
    );
  };

  function amountErrorSet(error) {
    setTimeout(() => {
      setamounterror(" ");
      //clearForm();
    }, 7000);
    return setamounterror(error);
  }

  //Validate Transfer
  function validateTransfer() {
    optionsState();
    if (transferAmount <= 0) {
      amountErrorSet("Is not permitted to transfer less than $1 dollar");
    } else {
      if (transferAmount > globalData.activeUserBalance) {
        amountErrorSet(
          "You can't transfer an amount greater than your personal balance"
        );
      } else {
        if (transferAmount > 1000) {
          amountErrorSet(
            "Transfers are not accepted of more than $1,000 dollars"
          );
        } else {
          if (selectedName === "Select one") {
            setselectederror("Please select a customer");
          } else {
            setShowConfirmation(true);
          }
        }
      }
    }
  }

  function clearSelected() {
    setselectedName("Select one");
    setselectedEmail("noemail");
    setselectedBalance(0);
    setselectedId("");
  }

  const optionsState = () => {
    var option = selectCustomer.options[selectCustomer.selectedIndex];
    let infoparts = option.value.split("-");
    setselectedName(infoparts[0]);
    setselectedEmail(infoparts[1]);
    setselectedBalance(Number(infoparts[2]));
    setselectedId(infoparts[3]);
    setselectedDBID(infoparts[4]);
  };

  const trasnferForm = (
    <>
      <div className="form-container" style={{ formstyle }}>
        <Card
          bgcolor="success"
          header="Transfer"
          body={
            <>
              Amount
              <br />
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.currentTarget.value)}
                onKeyPress={(event) => {
                  handleKeyPress(event);
                }}
              />
              <div style={{ color: "yellow" }}>{amounterror}</div>
              <br />
              To
              <select
                className="form-select"
                aria-label="Select one"
                id="selectedcustomers"
                onChange={optionsState}
                onClick={() => {
                  setselectederror(" ");
                }}
              >
                {renderoptions}
              </select>
              <div style={{ color: "yellow" }}>{selectederror}</div>
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={validateTransfer}
              >
                Submit
              </button>
            </>
          }
        />
      </div>
    </>
  );

  const goBack = () => {
    clearSelected();
    setShowConfirmation(false);
  };

  const confirm = (
    <>
      <div className="message_box message_alert confirm">
        <h2>Confirm Transaction</h2>
        <p>Are you sure that you want to transfer?</p>
        <p>
          {USDollars.format(transferAmount)} to {selectedName}
        </p>
        <Button
          className="btns"
          buttonStyle="mybtn--outline"
          buttonSize="mybtn--large"
          onClick={goBack}
        >
          Go Back
        </Button>
        <Button
          className="btns"
          buttonStyle="mybtn--outline"
          buttonSize="mybtn--large"
          onClick={handleTransfer}
        >
          Yes
        </Button>
      </div>
    </>
  );

  const updateCustomer_From = async (id, balance) => {
    const userDoc = doc(firebaseDB, "Customers", id);
    const newField = { Balance: balance };
    await updateDoc(userDoc, newField);
  };

  const updateCustomer_To = async (id, balance) => {
    const userDoc = doc(firebaseDB, "Customers", id);
    const newField = { Balance: balance };
    await updateDoc(userDoc, newField);
  };

  const addTransaction = async (
    customername,
    customerid,
    amount,
    description,
    trnstype
  ) => {
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
  };

  async function handleTransfer() {
    setshowSlip(true);
    var newBalance = 0;

    newBalance = Number(globalData.activeUserBalance) - Number(transferAmount);
    await updateCustomer_From(globalData.activeUserDBID, newBalance);

    let onlyname = globalData.activeUser.split(" ");
    await addTransaction(
      onlyname[0],
      globalData.activeUserID,
      Number(transferAmount),
      "To: " + selectedName,
      "Transfer"
    );

    newBalance = Number(selectedBalance) + Number(transferAmount);
    await updateCustomer_To(selectedDBID, newBalance);

    onlyname = selectedName.split(" ");
    await addTransaction(
      onlyname[0],
      selectedId,
      Number(transferAmount),
      "From: " + globalData.activeUser,
      "Transfer"
    );

    await globalData.addEventLog(globalData.activeUserID, "Transfer");
    await globalData.setAppActiveUser(globalData.activeUseremail);
  }

  const transferSlip = (
    <>
      <div className="message_box message_alert slip">
        <h2>- Deposit Slip -</h2>
        <p>
          The amount of {USDollars.format(transferAmount)} was tranfered to{" "}
          {selectedName}
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
          <h1>Transfers</h1>
        </div>
        <div className="subtitle">
          <h2>
            Please enter the amount and select the person that you want to
            transfer money
          </h2>
        </div>
        <div className="main_message_container">
          <div className="message_box">
            <img src={transfersLogo} alt="error" />
          </div>
          <div className="message_separator"></div>
          {showSlip ? transferSlip : showConfirmation ? confirm : trasnferForm}
        </div>
      </div>
    </>
  );
}

export default Transfer;
