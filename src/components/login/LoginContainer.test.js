import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

import authHelper from "../../data/authHelper";
import LoginContainer from "./LoginContainer";
import { AdminContext } from "../../hooks/AdminState";

function renderLoginContainer(history, adminMode, setAdminMode) {
  render(
    <AdminContext.Provider value={{ adminMode, setAdminMode }}>
      <LoginContainer history={history} />
    </AdminContext.Provider>
  );
}

function enterLoginCredentials() {
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "email@email.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "1234" },
  });
}

describe("given the page is rendered", () => {
  it("should display an empty login form", () => {
    renderLoginContainer();

    const username = screen.getByLabelText("Username").value;
    expect(username).toBe("");
    const password = screen.getByLabelText("Password").value;
    expect(password).toBe("");
    screen.getByText("Login");
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });
});

describe("given the user is already logged in", () => {
  it("should display message and not login form", () => {
    renderLoginContainer(null, true);

    screen.getByText("You are already logged in");
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });
});

describe("given crendetials are typed", () => {
  it("should display the typed values in the form", () => {
    renderLoginContainer();
    enterLoginCredentials();

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

    enterLoginCredentials();
    fireEvent.click(screen.getByText("Login"));
    screen.getByTestId("spinner");

    expect(authHelper.login).toHaveBeenCalledWith("email@email.com", "1234");
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      screen.getByText("User does not exist.");
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });

  it("should reroute to all blogs if login suucessful", async () => {
    const history = { push: jest.fn() };
    const setAdminMode = jest.fn();
    authHelper.login = jest.fn().mockResolvedValue({});
    renderLoginContainer(history, false, setAdminMode);

    enterLoginCredentials();
    fireEvent.click(screen.getByText("Login"));
    screen.getByTestId("spinner");
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(authHelper.login).toHaveBeenCalledWith("email@email.com", "1234");
      expect(history.push).toHaveBeenCalledWith("/");
      expect(setAdminMode).toHaveBeenCalledWith(true);
    });
  });
});
