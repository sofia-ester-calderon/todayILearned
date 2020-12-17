import { render } from "@testing-library/react";
import React from "react";
import BlogForm from "./BlogForm";
import { screen } from "@testing-library/react";
import { EditorState, ContentState } from "draft-js";

function renderBlogForm(args) {
  const defaultProps = {
    errors: {},
    onChange: jest.fn(),
    editorState: EditorState.createEmpty(),
    tags: [],
    editMode: false,
  };
  const props = { ...defaultProps, ...args };
  render(<BlogForm {...props} />);
}

it("shoud display an empty form", () => {
  renderBlogForm();

  const title = screen.getByLabelText("Title").value;
  expect(title).toBe("");
  const date = screen.getByLabelText("Date").value;
  expect(date).toBe("");
});

it("shoud display a filled out form", () => {
  renderBlogForm({
    title: "New Blog",
    date: "08/12/2020",
    editorState: EditorState.createWithContent(
      ContentState.createFromText("Hello")
    ),
  });

  screen.getByDisplayValue("New Blog");
  // screen.getByDisplayValue("2020-12-08");
  screen.getByText("Hello");
});

it("should not showEditor", () => {
  renderBlogForm({
    editorState: EditorState.createWithContent(
      ContentState.createFromText("Hello")
    ),
    hideEditor: true,
  });
  expect(screen.queryByText("Hello")).not.toBeInTheDocument();
});

it("should show tags", () => {
  renderBlogForm({
    tags: [
      {
        id: "1",
        name: "React",
      },
      {
        id: "2",
        name: "Java",
      },
    ],
  });

  screen.getByText("Java");
  screen.getByText("React");
});

it("should display error messages", () => {
  renderBlogForm({
    errors: {
      title: "title error message",
      date: "date error message",
      tags: "tag error message",
    },
  });

  screen.getByText("title error message");
  screen.getByText("date error message");
  screen.getByText("tag error message");
});

it("should display the correct buttons for create mode", () => {
  renderBlogForm();
  screen.getByText("Create Blog");
  screen.getByText("Cancel");
  expect(screen.queryByText("Edit Blog")).not.toBeInTheDocument();
  expect(screen.queryByText("Delete Blog")).not.toBeInTheDocument();
});

it("should display the correct buttons for edit mode", () => {
  renderBlogForm({ editMode: true });
  screen.getByText("Edit Blog");
  screen.getByText("Cancel");
  screen.getByText("Delete Blog");
  expect(screen.queryByText("Create Blog")).not.toBeInTheDocument();
});
