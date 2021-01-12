import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import blogHelper from "../../../data/blogHelper";
import { BlogTagsContext } from "../../../hooks/BlogTags";
import CrupdateBlogContainer from "../edit-create/CrupdateBlogContainer";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import tagOptions from "../../../hooks/TagOptions";

var dateFormat = require("dateformat");
const today = dateFormat(new Date(), "yyyy-mm-dd");
const text =
  '{"blocks":[{"key":"9c8ie","text":"this is the text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
const tags = ["React"];
const memoryHistory = createMemoryHistory();
const onAlterTags = jest.fn();

function renderCrupdateBlogContainer(blogTags, blogId) {
  const actualBlogTags = blogTags ? blogTags : [];
  const match = { params: { id: blogId } };
  render(
    <BlogTagsContext.Provider
      value={{ usedTags: actualBlogTags, onAlterTags, allTags: [] }}
    >
      <Router history={memoryHistory}>
        <CrupdateBlogContainer history={memoryHistory} match={match} />
      </Router>
    </BlogTagsContext.Provider>
  );
}

describe("given the page is rendered", () => {
  it("should display the empty form", () => {
    renderCrupdateBlogContainer();

    const date = screen.getByLabelText("Date").value;
    expect(date).toBe(today);
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });

  it("should display the tags from the context", () => {
    renderCrupdateBlogContainer(tags);

    screen.getByText("React");
  });

  it("should display filled out form if edit mode", async () => {
    blogHelper.getBlog = jest.fn().mockResolvedValue({
      id: 1,
      date: "2020-12-01",
      tags: ["tag1"],
      text,
    });
    renderCrupdateBlogContainer(null, "12345");

    await screen.findByDisplayValue("2020-12-01");
    screen.getByText("this is the text");
  });
});

describe("given the form is filled", () => {
  it("should display the new entries", () => {
    renderCrupdateBlogContainer();

    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2020-11-08" },
    });
    screen.getByDisplayValue("2020-11-08");
  });
});
describe("given tags are edited", () => {
  it("should show all available tags in modal", () => {
    renderCrupdateBlogContainer();
    fireEvent.click(screen.getByText("Configure Tags"));
    screen.getByText("Tags");
  });

  it("should not close the modal if no blog tags are chosen", () => {
    renderCrupdateBlogContainer();
    fireEvent.click(screen.getByText("Configure Tags"));
    fireEvent.click(screen.getByText("Done"));
    screen.getAllByText("A blog must have at least one tag");
    screen.getByText("Tags");
  });

  it("should close the modal", () => {
    renderCrupdateBlogContainer(tags);
    fireEvent.click(screen.getByText("Configure Tags"));
    fireEvent.click(screen.getByText("Done"));
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });
});

describe("given a blog is created", () => {
  it("should show error and do nothing if fields are empty", () => {
    blogHelper.createBlog = jest.fn();
    renderCrupdateBlogContainer();
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Create Blog"));
    screen.getByText("Please enter a valid date");
    screen.getByText("A blog must have at least one tag");
    expect(blogHelper.createBlog).not.toHaveBeenCalled();
  });

  it("should call createBlog", async () => {
    blogHelper.createBlog = jest.fn().mockResolvedValue();

    renderCrupdateBlogContainer(tags);

    fireEvent.click(screen.getByText("Create Blog"));

    expect(blogHelper.createBlog).toHaveBeenCalledWith(
      { date: today, text: "" },
      tags
    );

    expect(memoryHistory.location.pathname).toBe("/");
  });
});

describe("given a blog is edited", () => {
  it("should call editBlog", async () => {
    blogHelper.updateBlog = jest.fn().mockResolvedValue();
    blogHelper.getBlog = jest.fn().mockResolvedValue({
      id: 1,
      date: "2020-12-01",
      tags: ["tag1"],
      text,
    });

    renderCrupdateBlogContainer(tags, "12345");
    await screen.findByDisplayValue("2020-12-01");

    fireEvent.click(screen.getByText("Update Blog"));

    expect(blogHelper.updateBlog).toHaveBeenCalledWith(
      { date: "2020-12-01", text, id: 1, tags: ["tag1"] },
      tags
    );

    expect(memoryHistory.location.pathname).toBe("/");
  });
});

describe("given a blog is deleted", () => {
  it("should open the are you sure modal", async () => {
    blogHelper.getBlog = jest.fn().mockResolvedValue({
      id: 1,
      date: "2020-12-01",
      tags: ["tag1"],
      text,
    });

    renderCrupdateBlogContainer(tags, jest.fn(), "12345");
    await screen.findByText("Delete Blog");

    fireEvent.click(screen.getByText("Delete Blog"));

    screen.getByText("Are you sure?");
  });

  it("should do nothing if No is clicked", async () => {
    blogHelper.deleteBlog = jest.fn();
    blogHelper.getBlog = jest.fn().mockResolvedValue({
      id: 1,
      date: "2020-12-01",
      tags: ["tag1"],
      text,
    });

    renderCrupdateBlogContainer(tags, jest.fn(), "12345");
    await screen.findByText("Delete Blog");

    fireEvent.click(screen.getByText("Delete Blog"));

    fireEvent.click(screen.getByText("No"));
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    expect(blogHelper.deleteBlog).not.toHaveBeenCalled();
  });

  it("should do delete if Yes is clicked", async () => {
    blogHelper.deleteBlog = jest.fn();
    blogHelper.getBlog = jest.fn().mockResolvedValue({
      id: 1,
      date: "2020-12-01",
      tags: ["tag1"],
      text,
    });

    renderCrupdateBlogContainer(tags, jest.fn(), "12345");
    await screen.findByText("Delete Blog");

    fireEvent.click(screen.getByText("Delete Blog"));

    fireEvent.click(screen.getByText("Yes"));
    expect(blogHelper.deleteBlog).toHaveBeenCalledWith(1);
    expect(memoryHistory.location.pathname).toBe("/");
  });
});

it("should return directly to main page", () => {
  renderCrupdateBlogContainer(tags);

  fireEvent.click(screen.getByText("Cancel"));
  expect(memoryHistory.location.pathname).toBe("/");
  expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ON_RESET);
});
