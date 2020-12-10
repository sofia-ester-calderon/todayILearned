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

  const [tag1, tag2, tag3] = screen.getAllByTestId("allTags");

  expect(tag1.textContent).toBe("tag1");
  expect(tag2.textContent).toBe("tag2");
  expect(tag3.textContent).toBe("tag3");
});

it("should display all blog tags", () => {
  const tags = [
    { name: "blogtag1", id: "1" },
    { name: "blogtag2", id: "2" },
  ];

  renderTagOverview({ blogTags: tags });

  const [tag1, tag2] = screen.getAllByTestId("blogTags");
  expect(tag1.textContent).toBe("blogtag1");
  expect(tag2.textContent).toBe("blogtag2");
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

it("should not display Blog Tags if blogtags array is empty", () => {
  renderTagOverview({ blogTags: [] });

  expect(screen.queryByText("Blog Tags")).not.toBeInTheDocument();
});
