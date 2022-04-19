import React, { useState, useEffect, useContext } from "react";
import "../styles/FormContainer.css";
import SingUpForm from "./SingUpForm";
import ButtonGoogleLogIn from "./ButtonGoogleLogIn";
import SingUpSuccess from "./SingUpSuccess";
import Context from "../components/Context";

//Firebase
import firebaseAuth from "../firebase/firebasefakebank";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseDB } from "../firebase/firebasefakebank";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function SingUpSection() {
  const provider = new GoogleAuthProvider();

  const globalData = useContext(Context);
  const logsRef = collection(firebaseDB, "Logs");

  //Success Form
  const [title, setTitle] = useState("");
  const [newCustomer, setnewCustomer] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  //Fields
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfi, setPasswordconfi] = useState("");

  //Errors
  const [nameerror, setNameerror] = useState("");
  const [lastnameerror, setLastNameerror] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [passwordconfierror, setPasswordconfierror] = useState("");

  //Validation
  const [fullValidate, setfullValidate] = useState(false);
  const [submitButtonStyle, setsubmitButtonStyle] = useState(
    "btn btn-light disabled"
  );

  //Firebase reference collection
  const customersRef = collection(firebaseDB, "Customers");

  //************************************************************ */
  const [hasAccount, sethasAccount] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allemails, setAllemails] = useState("");

  firebaseAuth.onAuthStateChanged((user) => {
    if (user != null) {
      //console.log("Firebase Email from SignUp");
      //console.log(user.email);
      globalData.setAppActiveUser(user.email);
    }
  });

  useEffect(() => {
    const getCustomers = async () => {
      const data = await getDocs(customersRef);
      setAllCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      let allcustomeremails = [];
      allCustomers.forEach((customer) => {
        allcustomeremails.push(customer.eMail);
      });
      setAllemails(allcustomeremails);
    };
    getCustomers();
  }, [email]);

  useEffect(() => {
    if (
      name != "" &&
      nameerror == "" &&
      lastname != "" &&
      lastnameerror == "" &&
      email != "" &&
      emailError == "" &&
      password != "" &&
      password.length > 7 &&
      passwordError == "" &&
      passwordconfierror == ""
    ) {
      setsubmitButtonStyle("btn btn-light");
      setfullValidate(true);
    } else {
      setsubmitButtonStyle("btn btn-light disabled");
      setfullValidate(false);
    }
  }, [name, lastname, email, password, passwordconfi]);

  //Sing Up
  const setNewCustomer = async () => {
    //Get the id for the next data
    const data = await getDocs(customersRef);
    const AllCustomers = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let ID_Size = AllCustomers.length + 1;
    let ID = ID_Size.toString().padStart(5, "0");

    let date = new Date().toLocaleDateString("en-US");
    let time = new Date().toLocaleTimeString("en-US");

    await addDoc(customersRef, {
      Balance: 0,
      Date: date,
      LastName: lastname,
      Name: name,
      Time: time,
      UserId: ID,
      eMail: email,
      CreatedAt: serverTimestamp(),
    });

    globalData.addEventLog(ID, "Account Created");
    setTitle("New Account Created for:");
    setShowMessage(true);
  };

  const clearInputs = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordconfi("");
  };

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
        setnewCustomer(google_name + " " + google_lastname);
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
        setTitle("Welcome back!");
        setShowMessage(true);
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

        setTitle("New Account Created for:");
        setShowMessage(true);
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

  const handleSignup = async (e) => {
    e.preventDefault();
    let advance = false;
    if (fullValidate) {
      try {
        const user = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        advance = true;
        setnewCustomer(name + " " + lastname);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailError("eMail already in use");
            break;
          case "auth/invalid-email":
            setEmailError("Invalid eMail");
            break;
          case "auth/weak-password":
            setpasswordError("Weak Password");
            break;
        }
      }
    }

    if (advance) {
      setNewCustomer();
      globalData.setAppActiveUser(email);
      clearInputs();
    }
  };

  return (
    <>
      <div
        className={
          showMessage ? "main-container main-min-heigh" : "main-container"
        }
      >
        <img
          className="bg-image"
          src={globalData.allimages["singup.png"]}
          alt="bgimage"
        />
        <h1>Sing Up</h1>
      </div>
      <div className="message-xlg successbox">
        <h1>Create your account and be part of our family here!</h1>
      </div>

      {showMessage ? (
        <SingUpSuccess
          title={title}
          newCustomer={newCustomer}
          setShowMessage={setShowMessage}
        />
      ) : (
        <div className="form_container">
          <div className="form_slot">
            <SingUpForm
              name={name}
              setname={setName}
              lastname={lastname}
              setlastname={setLastName}
              email={email}
              setemail={setEmail}
              password={password}
              setpassword={setPassword}
              passwordconfi={passwordconfi}
              setpasswordconfi={setPasswordconfi}
              handlesignup={handleSignup}
              hasaccount={hasAccount}
              sethasaccount={sethasAccount}
              nameerror={nameerror}
              setnameerror={setNameerror}
              lastnameerror={lastnameerror}
              setlastnameerror={setLastNameerror}
              emailerror={emailError}
              setemailerror={setEmailError}
              passworderror={passwordError}
              setpassworderror={setpasswordError}
              passwordconfierror={passwordconfierror}
              setpasswordconfierror={setPasswordconfierror}
              submitbuttonstyle={submitButtonStyle}
              allemails={allemails}
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
    </>
  );
}

export default SingUpSection;
