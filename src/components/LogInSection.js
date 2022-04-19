import React, { useState, useEffect, useContext } from "react";
import Context from "../components/Context";
import { useHistory } from "react-router-dom";

import "../styles/LogInSection.css";
import "../styles/FormContainer.css";
import mainbg from "../images/login_bg_2_sm.png";

import LogInUserForm from "./LogInForm";
import LoginSuccess from "../components/LoginSuccess";
import ButtonGoogleLogIn from "./ButtonGoogleLogIn";

import firebaseAuth from "../firebase/firebasefakebank";
import { firebaseDB } from "../firebase/firebasefakebank";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function LogInSection() {
  const globalData = useContext(Context);
  const myHistory = useHistory();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const customersRef = collection(firebaseDB, "Customers");
  const logsRef = collection(firebaseDB, "Logs");
  const [fullValidate, setfullValidate] = useState(false);

  /*
  const [allemails, setAllemails] = useState("");

  useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customersRef);
      const allCustomers = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let allcustomeremails = [];
      allCustomers.forEach((customer) => {
        allcustomeremails.push(customer.eMail);
      });
      setAllemails(allcustomeremails);
    };
    getCustomers();
  }, [email]);
  */

  const handlelogin = async (e) => {
    e.preventDefault();
    var usereMail = "";
    if (fullValidate) {
      try {
        const user = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        setLogIn(user.user.email);
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("Invalid eMail");
            break;
          case "auth/user-disabled":
            setEmailError("Account Disabled");
            break;
          case "auth/user-not-found":
            setEmailError("User not found");
            break;
          case "auth/wrong-password":
            setpasswordError("Account, not match");
            break;
        }
      }
    } else {
      //console.log("Error at LogIn!");
    }
  };

  async function setLogIn(usereMail) {
    const customersdata = await getDocs(customersRef);
    const allCustomers = customersdata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    var loggedCustomerId = "";
    allCustomers.forEach((customer) => {
      if (customer.eMail === usereMail) {
        loggedCustomerId = customer.UserId;
      }
    });
    globalData.addEventLog(loggedCustomerId, "Log-In");
    globalData.setAppActiveUser(usereMail);
  }

  const googleLogIn = async () => {
    //SingIN with Google

    const loggedIN = await signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const google_displayname = result.user.displayName;
        const google_name = result._tokenResponse.firstName;
        const google_lastname = result._tokenResponse.lastName;
        const google_email = result.user.email;
        const info = {
          found: true,
          google_displayname: google_displayname,
          google_name: google_name,
          google_lastname: google_lastname,
          google_email: google_email,
          error: "none",
        };
        return info;
      })
      .catch((error) => {
        const info = {
          found: false,
          google_displayname: "",
          google_name: "",
          google_lastname: "",
          google_email: "",
          error: error,
        };
        return info;
      });

    //Create new customer ID
    const customersdata = await getDocs(customersRef);
    const allCustomers = customersdata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    let ID_Size = allCustomers.length + 1;
    let newCustomerID = ID_Size.toString().padStart(5, "0");

    //get Time event
    let thismoment_TimeStamp = serverTimestamp();
    let date = new Date().toLocaleDateString("en-US");
    let time = new Date().toLocaleTimeString("en-US");

    //Set event Logs
    const logdata = await getDocs(logsRef);
    const Logs = logdata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    let log_ID_Size = Logs.length + 1;
    let log_ID = log_ID_Size.toString().padStart(7, "0");

    //Veify customer existance
    var customerAccountInfo = "none";
    if (loggedIN.found) {
      allCustomers.forEach((customer) => {
        if (customer.eMail === loggedIN.google_email) {
          customerAccountInfo = customer;
        }
      });

      if (customerAccountInfo != "none") {
        setActiveCustomer(customerAccountInfo);

        await addDoc(logsRef, {
          Date: date,
          LogNumber: log_ID,
          LogType: "Google Log-In",
          Time: time,
          UserId: customerAccountInfo.UserId,
          TimeStamp: thismoment_TimeStamp,
        });
      } else {
        await addDoc(customersRef, {
          Balance: 0,
          Date: date,
          LastName: loggedIN.google_lastname,
          Name: loggedIN.google_name,
          Time: time,
          UserId: newCustomerID,
          eMail: loggedIN.google_email,
          CreatedAt: thismoment_TimeStamp,
        });
        setActiveCustomer(customerAccountInfo);

        await addDoc(logsRef, {
          Date: date,
          LogNumber: log_ID,
          LogType: "Account Created",
          Time: time,
          UserId: newCustomerID,
          TimeStamp: thismoment_TimeStamp,
        });

        log_ID_Size = Logs.length + 2;
        log_ID = log_ID_Size.toString().padStart(7, "0");

        await addDoc(logsRef, {
          Date: date,
          LogNumber: log_ID,
          LogType: "Google Log-In",
          Time: time,
          UserId: newCustomerID,
          TimeStamp: thismoment_TimeStamp,
        });
      }
    } else {
      //Do nothing
    }
  };

  function setActiveCustomer(customer) {
    globalData.setactiveUseremail(customer.eMail);
    globalData.setactiveUserID(customer.UserId);
    globalData.setactiveUserBalance(customer.Balance);
    globalData.setactiveUserDBID(customer.id);
    globalData.setactiveUser(customer.Name + " " + customer.LastName);
  }

  //Full Log Out
  function logoutActions() {
    globalData.addEventLog(globalData.activeUserID, "Log-Out");
    clearInputs();
    clearErros();
    globalData.logOut();
    globalData.logOut();
    globalData.clearActiveUser();
    localStorage.clear();
    myHistory.push("/log-out");
  }

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErros = () => {
    setEmailError("");
    setpasswordError("");
  };

  return (
    <>
      <div className="message-title">LOG IN</div>
      <img className="bg-image" src={mainbg} alt="bgimage" />
      <div className="main_message_container">
        {globalData.activeUser != "" ? (
          <LoginSuccess
            activeuser={globalData.activeUser}
            logoutactions={logoutActions}
          />
        ) : (
          <div className="form_container">
            <div className="form_slot">
              <LogInUserForm
                email={email}
                setemail={setEmail}
                password={password}
                setpassword={setPassword}
                handlelogin={handlelogin}
                emailerror={emailError}
                setemailerror={setEmailError}
                passworderror={passwordError}
                setfullvalidate={setfullValidate}
              />
            </div>
            <div className="form_slot alone">
              <div>
                <h1>Fill the form or use your Google account</h1>
                <ButtonGoogleLogIn onClick={googleLogIn} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LogInSection;
