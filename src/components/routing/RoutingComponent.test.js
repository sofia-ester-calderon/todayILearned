import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import RoutingComponent from "./RoutingComponent";
import { createMemoryHistory } from "history";
import { AdminContext } from "../../hooks/AdminState";

const history = createMemoryHistory();

function renderRoutingComponent(adminMode) {
  render(
    <AdminContext.Provider value={{ adminMode, setAdminMode: jest.fn() }}>
      <Router history={history}>
        <RoutingComponent />
      </Router>
    </AdminContext.Provider>
  );
}

it("should render the blog list if rendered for the first time", () => {
  renderRoutingComponent();
  screen.getByText("All Blogs");
});

it("should render login page if url is /admin", () => {
  renderRoutingComponent();
  history.push("/admin");
  screen.getByText("Admin Login");
});

it("should render the about me page if url is /aboutme", () => {
  renderRoutingComponent();
  history.push("/aboutme");
  screen.getByText("About Me");
});

it("should render the blog list if wrong url is passed", () => {
  renderRoutingComponent();
  history.push("/wrong");
  screen.getByText("All Blogs");
});

it("should render the edit blog page if url is /edit/{id}", () => {
  renderRoutingComponent(true);
  history.push("edit/12345");
  screen.getByText("Edit Blog");
});

it("should render blog list if url is /edit/{id} but user is not authenitcated", () => {
  renderRoutingComponent();
  history.push("edit/12345");
  screen.getByText("All Blogs");
});

it("should render the create blog page if url is /new", () => {
  renderRoutingComponent(true);
  history.push("new");
  screen.getByText("Create Blog");
});

it("should render blog list if url is /new but user is not authenitcated", () => {
  renderRoutingComponent();
  history.push("new");
  screen.getByText("All Blogs");
});
