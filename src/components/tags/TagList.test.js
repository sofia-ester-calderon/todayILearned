import React from "react";
import { render, screen } from "@testing-library/react";
import TagList from "./TagList";

function renderTagList(args) {
  const props = {
    tags: [
      {
        id: "1",
        name: "Java",
      },
      {
        id: "2",
        name: "React",
      },
    ],
  };
  render(<TagList {...props} />);
}

it("should list all tags", () => {
  renderTagList();
  screen.getByText("Java");
  screen.getByText("React");
});
