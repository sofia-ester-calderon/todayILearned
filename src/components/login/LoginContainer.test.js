import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import authHelper from "../../data/authHelper";
import LoginContainer from "./LoginContainer";

function renderLoginContainer() {
  render(<LoginContainer />);
}

describe("given the page is rendered", () => {
  it("should display an empty login form", () => {
    renderLoginContainer();

    const username = screen.getByLabelText("Username").value;
    expect(username).toBe("");
    const password = screen.getByLabelText("Password").value;
    expect(password).toBe("");
    screen.getByText("Login");
  });
});

describe("given crendetials are typed", () => {
  it("should display the typed values in the form", () => {
    renderLoginContainer();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "1234" },
    });

    screen.getByDisplayValue("email@email.com");
    screen.getByDisplayValue("1234");
  });
});

describe("given the login button is clicked", () => {
  it("should display errors if fields are empty and not login", () => {
    authHelper.login = jest.fn();
    renderLoginContainer();
    fireEvent.click(screen.getByText("Login"));

    screen.getByText("Please enter a username");
    screen.getByText("Please enter a password");
    expect(authHelper.login).not.toHaveBeenCalled();
  });

  it("should call the login authHelper", () => {
    authHelper.login = jest.fn();
    renderLoginContainer();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByText("Login"));
    expect(authHelper.login).toHaveBeenCalledWith("email@email.com", "1234");
  });

  it("should display the error message if authHelper throws error", async () => {
    authHelper.login = jest.fn().mockRejectedValue({
      code: "UserNotFoundException",
      message: "User does not exist.",
      name: "UserNotFoundException",
    });
    renderLoginContainer();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByText("Login"));
    expect(authHelper.login).toHaveBeenCalledWith("email@email.com", "1234");
    await screen.findByText("User does not exist.");
  });
});
