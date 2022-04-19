import React, { useState, useEffect } from "react";
//import "../styles/TableStyles.css";
import "../styles/TablesStyle.scss";
import Header from "./table/Header";
import Table from "./table/Table";
import TableLg from "./table/TableLg";
import mainbg from "../images/alldata_bg_2.png";
import bank2 from "../images/bank2.png";

import { firebaseDB } from "../firebase/firebasefakebank";
import { collection, getDocs } from "firebase/firestore";

function AllDataSection() {
  //Get Customers
  const [customers, setAllCustomers] = useState([]);
  const customersRef = collection(firebaseDB, "Customers");

  //Get Visitors
  const [visitors, setAllVisitors] = useState([]);
  const visitorsRef = collection(firebaseDB, "Visitors");

  //Get Transactions
  const [transactions, setTransactions] = useState([]);
  const transactionsRef = collection(firebaseDB, "Transactions");

  //Get Transactions
  const [logs, setLogs] = useState([]);
  const logsRef = collection(firebaseDB, "Logs");

  useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customersRef);
      setAllCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getVisitors = async () => {
      const data = await getDocs(visitorsRef);
      setAllVisitors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getTransactions = async () => {
      const data = await getDocs(transactionsRef);
      setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getLogs = async () => {
      const data = await getDocs(logsRef);
      setLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCustomers();
    getVisitors();
    getTransactions();
    getLogs();
  }, []);

  //Set and display Customers info
  function getCustomersInfo() {
    const myCustomers = [];
    customers.map((customer) => {
      myCustomers.push({
        userid: customer.UserId,
        name: customer.Name + " " + customer.LastName,
        email: customer.eMail,
        balance: customer.Balance,
        member: customer.Date,
      });
    });
    myCustomers.sort(sortCustomers);
    return myCustomers;
  }

  function sortCustomers(a, b) {
    if (a.userid < b.userid) {
      return -1;
    }
    if (a.userid > b.userid) {
      return 1;
    }
    return 0;
  }

  //Set and display Visitors info
  function getVisitorsInfo() {
    const myVisitors = [];
    visitors.map((visitor) => {
      myVisitors.push({
        date: visitor.Date,
        visitorid: visitor.VisitorId,
        name: visitor.Name,
        message: visitor.Message,
      });
    });
    myVisitors.sort(sortVisitors);
    return myVisitors;
  }

  function sortVisitors(a, b) {
    if (a.visitorid < b.visitorid) {
      return -1;
    }
    if (a.visitorid > b.visitorid) {
      return 1;
    }
    return 0;
  }

  //Set and display Transactions info
  function getTransactionsInfo() {
    const myTransactions = [];
    transactions.map((transaction) => {
      myTransactions.push({
        tid: transaction.TransactionID,
        date: transaction.Date,
        time: transaction.Time,
        userid: transaction.UserId,
        name: transaction.Name,
        ttype: transaction.TransactionType,
        amount: transaction.Amount,
        descript: transaction.Description,
      });
    });
    myTransactions.sort(sortTransactions);
    return myTransactions;
  }

  function sortTransactions(a, b) {
    if (a.tid < b.tid) {
      return -1;
    }
    if (a.tid > b.tid) {
      return 1;
    }
    return 0;
  }

  //Set and display Logs info
  function getLogsInfo() {
    const myLogs = [];
    logs.map((log) => {
      myLogs.push({
        lognumber: log.LogNumber,
        date: log.Date,
        time: log.Time,
        type: log.LogType,
        by: log.UserId,
      });
    });
    myLogs.sort(sortLogs);
    return myLogs;
  }

  function sortLogs(a, b) {
    if (a.lognumber < b.lognumber) {
      return -1;
    }
    if (a.lognumber > b.lognumber) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <div className="main-container">
        <img className="bg-image" src={mainbg} alt="bgimage" />
        <h1>
          <div>
            <span>All Data</span>
          </div>
        </h1>
      </div>

      <div className="secondary-container">
        <div className="tables">
          <Header title="Users and Visitors" />
          <Table
            tableData={getCustomersInfo()}
            headingColumns={[
              "User ID",
              "Name",
              "eMail",
              "Balance",
              "Customer Since",
            ]}
            title="Customers"
            breakOn="medium"
          />
          <TableLg
            tableData={getVisitorsInfo()}
            headingColumns={["Date", "Visitor Id", "Name", "Message"]}
            title="Visitors Activities"
            breakOn="medium"
          />
          <Header title="Transactions and Logs" />
          <TableLg
            tableData={getTransactionsInfo()}
            headingColumns={[
              "Tran #",
              "Date",
              "Time",
              "User ID",
              "Name",
              "Type",
              "Amount",
              "Description",
            ]}
            title="Financial Transactions"
            breakOn="medium"
          />
          <Table
            tableData={getLogsInfo()}
            headingColumns={["Log#", "Date", "Time", "Log Type", "By"]}
            title="Logs"
            breakOn="medium"
          />
        </div>
        <img
          src={bank2}
          className="img-fluid mx-auto d-block"
          alt="bankimage"
          style={{ margin: "40px auto", width: "100px", display: "block" }}
        />
      </div>
    </>
  );
}

export default AllDataSection;
