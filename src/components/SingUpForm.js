import React from "react";
import Card from "./Card";

function SingUpForm(props) {
  const {
    name,
    setname,
    lastname,
    setlastname,
    email,
    setemail,
    password,
    setpassword,
    passwordconfi,
    setpasswordconfi,
    handlesignup,
    nameerror,
    setnameerror,
    lastnameerror,
    setlastnameerror,
    emailerror,
    setemailerror,
    passworderror,
    setpassworderror,
    passwordconfierror,
    setpasswordconfierror,
    submitbuttonstyle,
    allemails,
  } = props;

  const validateName = (value) => {
    setname(value);
    if (value == "" || value == " " || value == null) {
      setnameerror("Please, enter your name!");
    } else {
      setnameerror("");
    }
  };

  const validateLastName = (value) => {
    setlastname(value);
    if (value == "" || value == " " || value == null) {
      setlastnameerror("Lastname is required.");
    } else {
      setlastnameerror("");
    }
  };

  const validateeMail = (value) => {
    setemail(value);
    if (value == "" || value == " " || value == null) {
      setemailerror("eMail is required");
    } else {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setemailerror("Please enter a valid email.");
      } else {
        //console.log(allemails);
        if (allemails.includes(value)) {
          setemailerror("That email is already in use.");
        } else {
          setemailerror("");
        }
      }
    }
  };

  const validatePassword = (value) => {
    setpassword(value);
    if (value == "" || value == " " || value == null) {
      setpassworderror("Password is required to create a new account");
    } else {
      if (value.length < 8) {
        setpassworderror("Password most has at less 8 characters long");
      } else {
        setpassworderror("");
      }
    }
  };

  const validatePasswordConfirmation = (value) => {
    setpasswordconfi(value);
    if (value == password) {
      setpasswordconfierror("");
    } else {
      setpasswordconfierror("Passwords do not match");
    }
  };

  return (
    <>
      <Card
        autoComplete="off"
        autofill="off"
        bgcolor="primary"
        header="Create Account"
        body={
          <form autoComplete="off">
            Name
            <input
              autoComplete="off"
              autofill="off"
              required
              type="input"
              className="form-control"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => validateName(e.target.value)}
            />
            <p className="errorMsg">{nameerror}</p>
            Last Name
            <input
              autoComplete="off"
              autofill="off"
              type="input"
              className="form-control"
              placeholder="Enter Lastname"
              value={lastname}
              onChange={(e) => validateLastName(e.target.value)}
            />
            <p className="errorMsg">{lastnameerror}</p>
            Email address
            <input
              autoComplete="new-email"
              autofill="off"
              type="email"
              className="form-control"
              required
              placeholder="Enter eMail"
              value={email}
              onChange={(e) => {
                validateeMail(e.target.value);
              }}
            />
            <p className="errorMsg">{emailerror}</p>
            Password
            <input
              autoComplete="new-password"
              autofill="off"
              type="password"
              className="form-control"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                validatePassword(e.target.value);
              }}
            />
            <p className="errorMsg">{passworderror}</p>
            Password Confirmation
            <input
              autoComplete="new-password"
              autofill="off"
              type="password"
              className="form-control"
              required
              placeholder="Enter password again"
              value={passwordconfi}
              onChange={(e) => {
                validatePasswordConfirmation(e.target.value);
              }}
            />
            <p className="errorMsg">{passwordconfierror}</p>
            <br />
            <button
              type="submit"
              className={submitbuttonstyle}
              onClick={handlesignup}
            >
              Create Account
            </button>
          </form>
        }
      />
    </>
  );
}

export default SingUpForm;
