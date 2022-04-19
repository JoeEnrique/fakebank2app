import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

//import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Context from "./components/Context";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import SignUp from "./pages/SignUp";
import AllData from "./pages/AllData";
import Visit from "./pages/Visit";

import Balance from "./components/Balance";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/Transfer";
import FakeATM from "./components/FakeATM";

import About from "./components/Footer/About";
import Project from "./components/Footer/Project";
import Resume from "./components/Footer/Resume";
import License from "./components/Footer/License";
import Reflection from "./components/Footer/Reflection";

import { firebaseDB } from "./firebase/firebasefakebank";
import firebaseAuth from "./firebase/firebasefakebank";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const myHistory = useHistory();

  //Active User set
  const [activeUser, setactiveUser] = useState("");
  const [activeUserID, setactiveUserID] = useState("");
  const [activeUserBalance, setactiveUserBalance] = useState(0);
  const [activeUseremail, setactiveUseremail] = useState("");
  const [activeUserDBID, setactiveUserDBID] = useState("");

  const [allimages, setallimages] = useState("");
  const [video, setvideo] = useState("");

  //All customers
  const [AllCustomers, setAllCustomers] = useState([]);
  const customersRef = collection(firebaseDB, "Customers");
  const logsRef = collection(firebaseDB, "Logs");

  firebaseAuth.onAuthStateChanged((user) => {
    if (user != null) {
      setAppActiveUser(user.email);
    } else {
      clearActiveUser();
    }
  });

  const setAppActiveUser = async (email) => {
    const data = await getDocs(customersRef);
    let myCustomersData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    myCustomersData.forEach((customer) => {
      if (customer.eMail === email) {
        //Set Active user info
        setactiveUseremail(customer.eMail);
        setactiveUserID(customer.UserId);
        setactiveUserBalance(customer.Balance);
        setactiveUserDBID(customer.id);
        setactiveUser(customer.Name + " " + customer.LastName);
      }
    });
  };

  const logOut = async () => {
    await signOut(firebaseAuth);
  };

  const clearActiveUser = () => {
    setactiveUser("");
    setactiveUserID("");
    setactiveUserBalance(0);
    setactiveUseremail("");
    setactiveUserDBID("");
  };

  //Set event Logs
  async function addEventLog(customerID, logType) {
    const logdata = await getDocs(logsRef);
    const Logs = logdata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let thismoment_TimeStamp = serverTimestamp();
    let date = new Date().toLocaleDateString("en-US");
    let time = new Date().toLocaleTimeString("en-US");

    let log_ID_Size = Logs.length + 1;
    let log_ID = log_ID_Size.toString().padStart(7, "0");

    await addDoc(logsRef, {
      Date: date,
      LogNumber: log_ID,
      LogType: logType,
      Time: time,
      UserId: customerID,
      TimeStamp: thismoment_TimeStamp,
    });
  }

  useEffect(() => {
    function importAll(imageFiles) {
      let images = {};
      imageFiles.keys().map((item, index) => {
        images[item.replace("./", "")] = imageFiles(item);
      });
      return images;
    }

    const images = importAll(
      require.context("./images", false, /\.(png|jpe?g|svg)$/)
    );

    function importAll(videoFiles) {
      let videos = {};
      videoFiles.keys().map((item, index) => {
        videos[item.replace("./", "")] = videoFiles(item);
      });
      return videos;
    }

    const videos = importAll(require.context("./videos", false, /\.(mp4)$/));

    setallimages(images);
    setvideo(videos);
  }, []);

  return (
    <>
      <Router>
        <Context.Provider
          value={{
            activeUser,
            setactiveUser,
            activeUserID,
            setactiveUserID,
            activeUserBalance,
            setactiveUserBalance,
            activeUseremail,
            setactiveUseremail,
            activeUserDBID,
            setactiveUserDBID,
            AllCustomers,
            setAllCustomers,
            customersRef,
            setAppActiveUser,
            clearActiveUser,
            logOut,
            addEventLog,
            allimages,
            video,
          }}
        >
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/log-in" component={LogIn} />
            <Route path="/log-out" component={LogOut} />
            <Route path="/services" component={Services} />
            <Route path="/balance" component={Balance} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/transfer" component={Transfer} />
            <Route path="/visitors" component={Visit} />
            <Route path="/all-data" component={AllData} />
            <Route path="/fake-atm" component={FakeATM} />
            <Route path="/project" component={Project} />
            <Route path="/about" component={About} />
            <Route path="/resume" component={Resume} />
            <Route path="/license" component={License} />
            <Route path="/reflection" component={Reflection} />
          </Switch>
        </Context.Provider>
      </Router>
    </>
  );
}

export default App;
