import React, { useState } from "react";
import authHelper from "../../data/authHelper";
import LoginForm from "./LoginForm";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";

const LoginContainer = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function changeLoginCredentialsHandler(event) {
    const { name, value } = event.target;
    setLoginCredentials((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  async function loginHandler(event) {
    event.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      authHelper
        .login(loginCredentials.username, loginCredentials.password)
        .then((user) => {
          props.history.push("/");
        })
        .catch((err) => {
          setLoading(false);
          console.log("error logging is user", err);
          setErrors((prevErrors) => ({ ...prevErrors, login: err.message }));
        });
    }
  }

  function isFormValid() {
    const formErrors = {};
    if (!loginCredentials.username || loginCredentials.username === "") {
      formErrors.username = "Please enter a username";
    }
    if (!loginCredentials.password || loginCredentials.password === "") {
      formErrors.password = "Please enter a password";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  return (
    <div className="m-5">
      <h1 className="mb-4">Admin Login</h1>
      <IfFirebaseAuthed>
        {() => {
          return <div>You are already logged in!</div>;
        }}
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
        {() => {
          return (
            <LoginForm
              username={loginCredentials.username}
              password={loginCredentials.password}
              onChange={changeLoginCredentialsHandler}
              onLogin={loginHandler}
              errors={errors}
              loading={loading}
            />
          );
        }}
      </IfFirebaseUnAuthed>
    </div>
  );
};

export default LoginContainer;
