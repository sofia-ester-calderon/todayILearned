import { render, screen } from "@testing-library/react";
import { EditorState } from "draft-js";
import React from "react";
import BlogView from "./BlogView";
import { ContentState } from "draft-js";

function renderComponent(args) {
  const defaultProps = {
    blog: {},
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
    tags: [
      { id: "2", name: "tag1" },
      { id: "3", name: "tag2" },
    ],
  };
  renderComponent({ blog });
  screen.getByText("December 18, 2020");
  screen.getByText("Hello");
  screen.getByText("tag1");
  screen.getByText("tag2");
});
