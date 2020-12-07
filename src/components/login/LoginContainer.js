import React, { useState } from "react";
import authHelper from "../../data/authHelper";
import { useAdminContext } from "../../hooks/AdminState";
import LoginForm from "./LoginForm";

const LoginContainer = (props) => {
  const adminState = useAdminContext();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
      try {
        const user = await authHelper.login(
          loginCredentials.username,
          loginCredentials.password
        );
        console.log("logged in", user);
        adminState.setAdminMode(true);
        props.history.push("/");
      } catch (err) {
        console.log("error logging is user", err);
        setErrors((prevErrors) => ({ ...prevErrors, login: err.message }));
      }
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
    <LoginForm
      username={loginCredentials.username}
      password={loginCredentials.password}
      onChange={changeLoginCredentialsHandler}
      onLogin={loginHandler}
      errors={errors}
    />
  );
};

export default LoginContainer;
