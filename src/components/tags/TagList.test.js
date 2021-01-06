import React from "react";
import { render, screen } from "@testing-library/react";
import TagList from "./TagList";

function renderTagList() {
  const props = {
    tags: ["Java", "React"],
  };
  render(<TagList {...props} />);
}

it("should list all tags", () => {
  renderTagList();
  screen.getByText("Java");
  screen.getByText("React");
});
