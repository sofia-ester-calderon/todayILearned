import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import RoutingComponent from "./RoutingComponent";
import { createMemoryHistory } from "history";
import { AdminProvider } from "../../hooks/AdminState";

const history = createMemoryHistory();

function renderRoutingComponent() {
  render(
    <AdminProvider>
      <Router history={history}>
        <RoutingComponent />
      </Router>
    </AdminProvider>
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
