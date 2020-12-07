import { render, screen } from "@testing-library/react";
import React from "react";
import LoginForm from "./LoginForm";

function renderLoginForm(args) {
  const defaultProps = {
    username: "",
    password: "",
    onChange: jest.fn(),
    errors: {},
  };
  const props = { ...defaultProps, ...args };
  render(<LoginForm {...props} />);
}

it("should display the empty login form", () => {
  renderLoginForm();

  const username = screen.getByLabelText("Username").value;
  expect(username).toBe("");
  const password = screen.getByLabelText("Password").value;
  expect(password).toBe("");
  screen.getByText("Login");
});

it("should display the passed values in the form", () => {
  renderLoginForm({ username: "username", password: "1234" });

  const username = screen.getByLabelText("Username").value;
  expect(username).toBe("username");
  const password = screen.getByLabelText("Password").value;
  expect(password).toBe("1234");
});

it("should display error messages", () => {
  renderLoginForm({
    errors: {
      username: "wrong username",
      password: "wrong password",
      login: "login failed",
    },
  });

  screen.getByText("wrong username");
  screen.getByText("wrong password");
  screen.getByText("login failed");
});
