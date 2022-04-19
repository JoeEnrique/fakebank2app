import React from "react";
import Card from "./Card";

function LogInForm(props) {
  const {
    email,
    setemail,
    password,
    setpassword,
    handlelogin,
    emailerror,
    setemailerror,
    passworderror,
    setfullvalidate,
  } = props;

  const validateeMail = (value) => {
    setemail(value);
    if (value == "" || value == " " || value == null) {
      setemailerror("eMail is required");
    } else {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setemailerror("Please enter a valid email.");
      } else {
        setemailerror("");
        setfullvalidate(true);
      }
    }
  };

  return (
    <Card
      autoComplete="off"
      autofill="off"
      bgcolor="secondary"
      header="Login"
      body={
        <>
          Email
          <br />
          <input
            autoComplete="new-email"
            autofill="off"
            type="email"
            className="form-control"
            autoFocus
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              validateeMail(e.target.value);
            }}
          />
          <p className="errorMsg">{emailerror}</p>
          <br />
          Password
          <br />
          <input
            autoComplete="new-password"
            autofill="off"
            type="password"
            className="form-control"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <p className="errorMsg">{passworderror}</p>
          <br />
          <button type="submit" className="btn btn-light" onClick={handlelogin}>
            Log In
          </button>
        </>
      }
    />
  );
}

export default LogInForm;
