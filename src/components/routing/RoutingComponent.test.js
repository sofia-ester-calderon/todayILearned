import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import RoutingComponent from "./RoutingComponent";
import { createMemoryHistory } from "history";
import { BlogTagsProvider } from "../../hooks/BlogTags";

const history = createMemoryHistory();
const mockContext = jest.fn();
jest.mock("@react-firebase/auth", () => ({
  FirebaseAuthConsumer: ({ children }) => children(mockContext()),
  IfFirebaseAuthed: ({ children }) => children(mockContext()),
  IfFirebaseUnAuthed: ({ children }) => children(mockContext()),
}));

function renderRoutingComponent(user) {
  mockContext.mockReset();
  mockContext.mockReturnValue({ isSignedIn: user });
  render(
    <BlogTagsProvider>
      <Router history={history}>
        <RoutingComponent />
      </Router>
    </BlogTagsProvider>
  );
}

it("should render the blog list if rendered for the first time", () => {
  renderRoutingComponent();
  screen.getByText("Today I Learned");
});

it("should render login page if url is /admin", () => {
  renderRoutingComponent();
  history.push("/admin");
  screen.getByText("Admin Login");
});

it("should render the about me page if url is /aboutme", () => {
  renderRoutingComponent();
  history.push("/aboutme");
  screen.getByText("Hope you enjoy it!");
});

it("should render the blog list if wrong url is passed", () => {
  renderRoutingComponent();
  history.push("/wrong");
  screen.getByText("Today I Learned");
});

it("should render the edit blog page if url is /edit/{id}", () => {
  renderRoutingComponent(true);
  history.push("edit/12345");
  screen.getByText("Date");
});

it("should render blog list if url is /edit/{id} but user is not authenitcated", () => {
  renderRoutingComponent();
  history.push("edit/12345");
  screen.getByText("Today I Learned");
});

it("should render the create blog page if url is /new", () => {
  renderRoutingComponent(true);
  history.push("new");
  screen.getByText("Date");
});

it("should render blog list if url is /new but user is not authenitcated", () => {
  renderRoutingComponent();
  history.push("new");
  screen.getByText("Today I Learned");
});
