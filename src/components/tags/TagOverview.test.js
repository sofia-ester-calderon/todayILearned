import { render, screen } from "@testing-library/react";
import React from "react";
import TagOverview from "./TagOverview";

function renderTagOverview(args) {
  const defaultProps = {
    tags: [],
    tagName: "",
    onChangeTagName: jest.fn(),
    onCreateTag: jest.fn(),
    onDeleteTag: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  render(<TagOverview {...props} />);
}

it("should display all the tags", () => {
  const tags = [
    { name: "tag1", id: "1" },
    { name: "tag2", id: "2" },
    { name: "tag3", id: "3" },
  ];
  renderTagOverview({ tags });

  screen.getByText("tag1");
  screen.getByText("tag2");
  screen.getByText("tag3");
});

it("shoud display the create tag button", () => {
  renderTagOverview();
  screen.getByText("Create Tag");
});

it("should display the new tag value", () => {
  renderTagOverview({ tagName: "new tag" });
  screen.getByDisplayValue("new tag");
});

it("should render loading spinner", () => {
  renderTagOverview({ loading: true });
  screen.getByTestId("spinner");
});
