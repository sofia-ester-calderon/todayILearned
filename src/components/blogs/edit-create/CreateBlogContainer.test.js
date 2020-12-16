import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import blogHelper from "../../../data/blogHelper";
import { BlogTagsContext } from "../../../hooks/BlogTags";
import CreateBlogContainer from "../edit-create/CreateBlogContainer";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

var dateFormat = require("dateformat");
const today = dateFormat(new Date(), "yyyy-mm-dd");

const tags = [
  {
    id: "1",
    name: "React",
  },
];
const memoryHistory = createMemoryHistory();

function renderCreateBlogContainer(blogTags, setBlogTags) {
  const actualBlogTags = blogTags ? blogTags : [];
  const actualSetter = setBlogTags ? setBlogTags : jest.fn();
  render(
    <BlogTagsContext.Provider
      value={{ blogTags: actualBlogTags, setBlogTags: actualSetter }}
    >
      <Router history={memoryHistory}>
        <CreateBlogContainer history={memoryHistory} />
      </Router>
    </BlogTagsContext.Provider>
  );
}

describe("given the page is rendered", () => {
  it("should display the empty form", () => {
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
    screen.getAllByText("A blog must have at least one tag");
    screen.getByText("Tags");
  });

  it("should close the modal", () => {
    renderCreateBlogContainer(tags);
    fireEvent.click(screen.getByText("Configure Tags"));
    fireEvent.click(screen.getByText("Done"));
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });
});

describe("given a blog is created", () => {
  it("should show error and do nothing if fields are empty", () => {
    blogHelper.createBlog = jest.fn();
    renderCreateBlogContainer();
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Create Blog"));
    screen.getByText("Please enter a title");
    screen.getByText("Please enter a valid date");
    screen.getByText("A blog must have at least one tag");
    expect(blogHelper.createBlog).not.toHaveBeenCalled();
  });

  it("should call createBlog", async () => {
    blogHelper.createBlog = jest.fn().mockResolvedValue();
    const setBlogTags = jest.fn();

    renderCreateBlogContainer(tags, setBlogTags);
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.click(screen.getByText("Create Blog"));

    expect(blogHelper.createBlog).toHaveBeenCalledWith(
      { title: "New Title", date: today, text: "" },
      tags
    );

    expect(memoryHistory.location.pathname).toBe("/");
  });
});

it("should return directly to main page", () => {
  const setBlogTags = jest.fn();
  renderCreateBlogContainer(tags, setBlogTags);

  fireEvent.click(screen.getByText("Cancel"));
  expect(memoryHistory.location.pathname).toBe("/");
  expect(setBlogTags).toHaveBeenCalledWith([]);
});
