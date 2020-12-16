import { render, screen } from "@testing-library/react";
import { EditorState } from "draft-js";
import React from "react";
import { ContentState } from "draft-js";
import BlogList from "./BlogList";

function renderComponent(args) {
  const defaultProps = {
    blogs: [],
    fetchNext: jest.fn(),
    nextToken: null,
  };
  const props = { ...defaultProps, ...args };
  render(<BlogList {...props} />);
}

it("should display the blog list", () => {
  const blogs = [
    {
      id: 1,
      date: "2020-12-18",
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Hello")
      ),
      tags: [
        { id: "2", name: "tag1" },
        { id: "3", name: "tag2" },
      ],
    },
    {
      id: 2,
      date: "2020-12-17",
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Goodbye")
      ),
      tags: [],
    },
  ];
  renderComponent({ blogs });
  screen.getByText("December 18, 2020");
  screen.getByText("Hello");
  screen.getByText("tag1");
  screen.getByText("tag2");

  screen.getByText("December 17, 2020");
  screen.getByText("Goodbye");
});
