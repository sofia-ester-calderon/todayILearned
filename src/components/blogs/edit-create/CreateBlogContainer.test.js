import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BlogTagsContext } from "../../../hooks/BlogTags";
import CreateBlogContainer from "../edit-create/CreateBlogContainer";

var dateFormat = require("dateformat");

const tags = [
  {
    id: "1",
    name: "React",
  },
];

function renderCreateBlogContainer(blogTags) {
  const actualBlogTags = blogTags ? blogTags : [];
  render(
    <BlogTagsContext.Provider
      value={{ blogTags: actualBlogTags, setBlogTags: jest.fn() }}
    >
      <CreateBlogContainer />
    </BlogTagsContext.Provider>
  );
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

  it("should display the tags from the context", () => {
    renderCreateBlogContainer(tags);

    screen.getByText("React");
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
  });
});
describe("given tags are edited", () => {
  it("should show all available tags in modal", () => {
    renderCreateBlogContainer();
    fireEvent.click(screen.getByText("Configure Tags"));
    screen.getByText("Tags");
  });

  it("should not close the modal if no blog tags are chosen", () => {
    renderCreateBlogContainer();
    fireEvent.click(screen.getByText("Configure Tags"));
    fireEvent.click(screen.getByText("Done"));
    screen.getByText("A blog must have at least one tag!");
    screen.getByText("Tags");
  });

  it("should close the modal", () => {
    renderCreateBlogContainer(tags);
    fireEvent.click(screen.getByText("Configure Tags"));
    fireEvent.click(screen.getByText("Done"));
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });
});
