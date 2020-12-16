import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { UserContext } from "../../hooks/UserState";
import MenuBar from "./MenuBar";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const history = createMemoryHistory();

function renderMenuBar(user) {
  const actualUser = user ? user : { session: true, adminMode: false };
  render(
    <UserContext.Provider value={{ user: actualUser, setUser: jest.fn() }}>
      <Router history={history}>
        <MenuBar />
      </Router>
    </UserContext.Provider>
  );
}

it("should display menu buttons", () => {
  renderMenuBar();
  screen.getByText("Home");
  screen.getByText("About this page");
  expect(screen.queryByText("Create Blog")).not.toBeInTheDocument();
});

it("should display create blog button if user is admin", () => {
  renderMenuBar({ session: true, adminMode: true });
  screen.getByText("Home");
  screen.getByText("About this page");
  screen.getByText("Create Blog");
});

it("should redirect", () => {
  renderMenuBar({ session: true, adminMode: true }, history);
  fireEvent.click(screen.getByText("About this page"));
  expect(history.location.pathname).toBe("/aboutme");

  fireEvent.click(screen.getByText("Create Blog"));
  expect(history.location.pathname).toBe("/new");

  fireEvent.click(screen.getByText("Home"));
  expect(history.location.pathname).toBe("/");
});
