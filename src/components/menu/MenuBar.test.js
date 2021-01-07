import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import MenuBar from "./MenuBar";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const history = createMemoryHistory();
const mockContext = jest.fn();
jest.mock("@react-firebase/auth", () => ({
  FirebaseAuthConsumer: ({ children }) => children(mockContext()),
}));

function renderMenuBar(user) {
  mockContext.mockReset();
  mockContext.mockReturnValue({ isSignedIn: user });
  render(
    <Router history={history}>
      <MenuBar />
    </Router>
  );
}

it("should display menu buttons", () => {
  renderMenuBar();
  screen.getByText("Home");
  screen.getByText("About");
  expect(screen.queryByText("Create Blog")).not.toBeInTheDocument();
});

it("should display create blog button if user is admin", () => {
  renderMenuBar(true);
  screen.getByText("Home");
  screen.getByText("About");
  screen.getByText("Create Blog");
});

it("should redirect", () => {
  renderMenuBar(true, history);
  fireEvent.click(screen.getByText("About"));
  expect(history.location.pathname).toBe("/aboutme");

  fireEvent.click(screen.getByText("Create Blog"));
  expect(history.location.pathname).toBe("/new");

  fireEvent.click(screen.getByText("Home"));
  expect(history.location.pathname).toBe("/");
});
