import React, { useState } from "react";
import authHelper from "../../data/authHelper";
import { useUserContext } from "../../hooks/UserState";
import LoginForm from "./LoginForm";

const LoginContainer = (props) => {
  const adminState = useUserContext();

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
          console.log("logged in", user);
          adminState.setUser({ session: true, adminMode: true });
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
      {adminState.user.adminMode ? (
        <p>You are already logged in</p>
      ) : (
        <LoginForm
          username={loginCredentials.username}
          password={loginCredentials.password}
          onChange={changeLoginCredentialsHandler}
          onLogin={loginHandler}
          errors={errors}
          loading={loading}
        />
      )}
    </div>
  );
};

export default LoginContainer;
