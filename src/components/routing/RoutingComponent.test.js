import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import RoutingComponent from "./RoutingComponent";
import { createMemoryHistory } from "history";
import { AdminContext } from "../../hooks/AdminState";
import { BlogTagsProvider } from "../../hooks/BlogTags";

const history = createMemoryHistory();

function renderRoutingComponent(user) {
  const actualUser = user ? user : { session: true, adminMode: false };
  render(
    <AdminContext.Provider value={{ user: actualUser, setUser: jest.fn() }}>
      <BlogTagsProvider>
        <Router history={history}>
          <RoutingComponent />
        </Router>
      </BlogTagsProvider>
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
  renderRoutingComponent({ session: true, adminMode: true });
  history.push("edit/12345");
  screen.getByText("Edit Blog");
});

it("should render blog list if url is /edit/{id} but user is not authenitcated", () => {
  renderRoutingComponent();
  history.push("edit/12345");
  screen.getByText("All Blogs");
});

it("should render the create blog page if url is /new", () => {
  renderRoutingComponent({ session: true, adminMode: true });
  history.push("new");
  screen.getByText("Create Blog Post");
});

it("should render blog list if url is /new but user is not authenitcated", () => {
  renderRoutingComponent();
  history.push("new");
  screen.getByText("All Blogs");
});
