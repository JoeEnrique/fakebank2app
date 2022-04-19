import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import Context from "./Context";
import "../styles/Messages.css";
import balanceLogo from "../images/services/balance.png";
import TableLg from "./table/TableLg";

import { firebaseDB } from "../firebase/firebasefakebank";
import { collection, getDocs } from "firebase/firestore";

function Balance() {
  const globalData = useContext(Context);
  const myHistory = useHistory();

  const posiveAmount = {
    color: "white",
  };

  const negativeAmount = {
    color: "red",
  };

  //Get Transactions
  const [transactions, setTransactions] = useState([]);
  const transactionsRef = collection(firebaseDB, "Transactions");

  //Get all transactions
  useEffect(() => {
    const getTransactions = async () => {
      const data = await getDocs(transactionsRef);
      setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTransactions();
  }, [transactionsRef]);

  //Set and display Transactions info
  function getTransactionsInfo() {
    //activeUserInfo();
    let nodata = "";
    const myTransactions = [];
    transactions.map((transaction) => {
      //Look for the customer
      if (globalData.activeUserID === transaction.UserId) {
        myTransactions.push({
          tid: transaction.TransactionID,
          date: transaction.Date,
          time: transaction.Time,
          ttype: transaction.TransactionType,
          amount: transaction.Amount,
          descript: transaction.Description,
        });
      }
      return nodata;
    });
    myTransactions.sort(sortTransactions);
    return myTransactions;
  }

  function sortTransactions(a, b) {
    if (a.tid < b.tid) {
      return 1;
    }
    if (a.tid > b.tid) {
      return -1;
    }
    return 0;
  }

  return (
    <>
      <div className="subtitle">
        <h1>Balance</h1>
      </div>
      <div className="main_message_container">
        <div className="message_box">
          <img src={balanceLogo} alt="error" />
        </div>
        <div className="message_separator"></div>
        <div className="message_box message_alert balance">
          <h2>Your account balance is:</h2>
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
      </div>
      <TableLg
        tableData={getTransactionsInfo()}
        headingColumns={[
          "Tran #",
          "Date",
          "Time",
          "Type",
          "Amount",
          "Description",
        ]}
        title={"Financial Transactions of " + globalData.activeUser}
        breakOn="medium"
      />
    </>
  );
}

export default Balance;
