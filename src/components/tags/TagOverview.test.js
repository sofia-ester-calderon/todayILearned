import { render, screen } from "@testing-library/react";
import React from "react";
import TagOverview from "./TagOverview";
import { BlogTagsContext } from "../../hooks/BlogTags";

function renderTagOverview(args) {
  const defaultProps = {
    unusedTags: [],
    tagName: "",
    onChangeTagName: jest.fn(),
    onCreateTag: jest.fn(),
    onDeleteTag: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  render(
    <BlogTagsContext.Provider
      value={{
        usedTags: [],
        unusedTags: [],
        onAlterTags: jest.fn(),
      }}
    >
      <TagOverview {...props} />
    </BlogTagsContext.Provider>
  );
}

it("should display the new tag value", () => {
  renderTagOverview({ tagName: "new tag" });
  screen.getByDisplayValue("new tag");
});

it("should display error messages", () => {
  renderTagOverview({
    errors: { tag: "Error Message", create: "Other message" },
  });
  screen.getByText("Error Message");
  screen.getByText("Other message");
});
