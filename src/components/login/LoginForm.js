import React from "react";
import TextInput from "../common/text/TextInput";

const LoginForm = ({
  username,
  password,
  onChange,
  onLogin,
  errors,
  loading = false,
}) => {
  return (
    <div className=" d-flex justify-content-center">
      <form>
        <TextInput
          label="Username"
          name="username"
          value={username}
          onChange={onChange}
          error={errors.username}
        />
        <TextInput
          label="Password"
          name="password"
          value={password}
          onChange={onChange}
          error={errors.password}
          type="password"
        />
        <button
          type="submit"
          className="btn btn btn-dark mb-3 mt-2"
          onClick={onLogin}
        >
          Login
        </button>
        <br />
        {loading && (
          <div className="spinner-border " role="status" data-testid="spinner">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {errors.login && (
          <div role="alert" className="text-danger">
            {errors.login}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
