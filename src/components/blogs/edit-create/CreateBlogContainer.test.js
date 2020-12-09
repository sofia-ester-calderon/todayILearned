import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CreateBlogContainer from "../edit-create/CreateBlogContainer";

var dateFormat = require("dateformat");

function renderCreateBlogContainer() {
  render(<CreateBlogContainer />);
}

describe("given the page is rendered", () => {
  it("should display the empty form", () => {
    const today = dateFormat(new Date(), "yyyy-mm-dd");
    renderCreateBlogContainer();

    const title = screen.getByLabelText("Title").value;
    expect(title).toBe("");
    const date = screen.getByLabelText("Date").value;
    expect(date).toBe(today);
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });
});

describe("given the form is filled", () => {
  it("should display the new entries", () => {
    renderCreateBlogContainer();

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Blog" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2020-11-08" },
    });
    screen.getByDisplayValue("New Blog");
    screen.getByDisplayValue("2020-11-08");

    // //Add Tags
    // fireEvent.change(screen.getByLabelText("New Tag"), {
    //   target: { value: "Tag1" },
    // });
    // fireEvent.click(screen.getByText("Add Tag"));
    // screen.getByText("Tag1");
    // const tags = screen.getByLabelText("New Tag").value;
    // expect(tags).toBe("");

    // //Remove Tags
    // fireEvent.click(screen.getByText("Tag1"));
    // expect(screen.queryByText("Tag1")).not.toBeInTheDocument();
  });
});
describe("given tags are edited", () => {
  it("should show all available tags in modal", () => {
    renderCreateBlogContainer();
    fireEvent.click(screen.getByText("Configure Tags"));
    screen.getByText("Tags");
  });

  it("should close the modal", () => {
    renderCreateBlogContainer();
    fireEvent.click(screen.getByText("Configure Tags"));
    fireEvent.click(screen.getByText("Done"));
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });
});
