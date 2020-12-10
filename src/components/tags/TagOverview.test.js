import { render, screen } from "@testing-library/react";
import React from "react";
import TagOverview from "./TagOverview";

function renderTagOverview(args) {
  const defaultProps = {
    unusedTags: [],
    tagName: "",
    onChangeTagName: jest.fn(),
    onCreateTag: jest.fn(),
    onDeleteTag: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  render(<TagOverview {...props} />);
}

it("should display all the unused tags", () => {
  const unusedTags = [
    { name: "tag1", id: "1" },
    { name: "tag2", id: "2" },
    { name: "tag3", id: "3" },
  ];
  renderTagOverview({ unusedTags });

  const [tag1, tag2, tag3] = screen.getAllByTestId("unusedTags");

  expect(tag1.textContent).toBe("tag1");
  expect(tag2.textContent).toBe("tag2");
  expect(tag3.textContent).toBe("tag3");
});

it("should display all used tags", () => {
  const usedTags = [
    { name: "blogtag1", id: "1" },
    { name: "blogtag2", id: "2" },
  ];

  renderTagOverview({ usedTags });

  const [tag1, tag2] = screen.getAllByTestId("usedTags");
  expect(tag1.textContent).toBe("blogtag1");
  expect(tag2.textContent).toBe("blogtag2");
});

it("should display the new tag value", () => {
  renderTagOverview({ tagName: "new tag" });
  screen.getByDisplayValue("new tag");
});

it("should render loading spinner", () => {
  renderTagOverview({ loading: true });
  screen.getByTestId("spinner");
});

it("should not display message if blog tags are empty", () => {
  renderTagOverview({ usedTags: [] });

  screen.getByText("No tags chosen yet");
});

it("should display error messages", () => {
  renderTagOverview({
    errors: { tag: "Error Message", create: "Other message" },
  });
  screen.getByText("Error Message");
  screen.getByText("Other message");
});
