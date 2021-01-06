import { render, screen } from "@testing-library/react";
import { EditorState } from "draft-js";
import React from "react";
import BlogView from "./BlogView";
import { ContentState } from "draft-js";

function renderComponent(args) {
  const defaultProps = {
    blog: {},
    admin: false,
    onEdit: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  render(<BlogView {...props} />);
}

it("should display the blog", () => {
  const blog = {
    id: 1,
    date: "2020-12-18",
    editorState: EditorState.createWithContent(
      ContentState.createFromText("Hello")
    ),
    tags: ["tag1", "tag2"],
  };
  renderComponent({ blog });
  screen.getByText("December 18, 2020");
  screen.getByText("Hello");
  screen.getByText("tag1");
  screen.getByText("tag2");
  expect(screen.queryByText("Edit")).not.toBeInTheDocument();
});

it("should display edit button if admin true", () => {
  const blog = {
    id: 1,
    date: "2020-12-18",
    editorState: EditorState.createWithContent(
      ContentState.createFromText("Hello")
    ),
    tags: [],
  };
  renderComponent({ blog, admin: true });
  screen.getByText("Edit");
});
