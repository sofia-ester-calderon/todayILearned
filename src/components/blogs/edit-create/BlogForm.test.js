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
