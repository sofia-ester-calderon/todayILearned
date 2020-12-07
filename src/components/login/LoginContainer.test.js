import {
  screen,
  render,
  fireEvent,
  waitFor,
  getByText,
} from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import authHelper from "../../data/authHelper";
import { AdminProvider } from "../../hooks/AdminState";
import LoginContainer from "./LoginContainer";

function renderLoginContainer(history) {
  render(
    <AdminProvider>
      <LoginContainer history={history} />
    </AdminProvider>
  );
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
    waitFor(() => {
      screen.getByText("User does not exist.");
    });
    // await screen.findByText("User does not exist.");
  });

  it("should reroute to all blogs if login suucessful", async () => {
    const history = { push: jest.fn() };
    authHelper.login = jest.fn().mockResolvedValue({});
    renderLoginContainer(history);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByText("Login"));
    waitFor(() => {
      expect(authHelper.login).toHaveBeenCalledWith("email@email.com", "1234");
      expect(history.push).toHaveBeenCalledWith("/");
    });
  });
});
