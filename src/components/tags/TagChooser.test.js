import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import blogHelper from "../../data/blogHelper";
import { BlogTagsContext } from "../../hooks/BlogTags";
import tagOptions from "../../hooks/TagOptions";
import TagChooser from "./TagChooser";

const tags = ["React", "Java"];

const onAlterTags = jest.fn();

async function renderTagChooser(usedTags, unusedTags) {
  const actualUsedTags = usedTags ? usedTags : [];
  const actualUnusedTags = unusedTags ? unusedTags : tags;
  const props = {
    onClose: jest.fn(),
  };
  blogHelper.fetchTags = jest.fn().mockResolvedValue(tags);
  render(
    <BlogTagsContext.Provider
      value={{
        usedTags: actualUsedTags,
        unusedTags: actualUnusedTags,
        onAlterTags,
      }}
    >
      <TagChooser {...props} />
    </BlogTagsContext.Provider>
  );
  await screen.findByText("Java");
}

describe("given the page is initially rendered", () => {
  it("should display all the tags", async () => {
    await renderTagChooser();

    const [tag1, tag2] = screen.getAllByTestId("unusedTags");

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ON_INIT_UNUSED, tags);
    expect(tag1.textContent).toBe("React");
    expect(tag2.textContent).toBe("Java");
  });

  it("should display all all tags and blog tags", async () => {
    await renderTagChooser(["React"], ["Java"]);

    const [tag1] = screen.getAllByTestId("unusedTags");
    const [tag2] = screen.getAllByTestId("usedTags");

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ON_INIT_UNUSED, [
      "Java",
    ]);

    expect(tag1.textContent).toBe("Java");
    expect(tag2.textContent).toBe("React");
  });

  it("should display message if blog tags are empty", async () => {
    await renderTagChooser();

    screen.getByText("No tags chosen yet");
  });
});

describe("given a tag is added to the blog", () => {
  it("should display that tag as blog tag and remove from unused tags", async () => {
    await renderTagChooser();
    fireEvent.click(screen.getByText("React"));

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ADD, "React");
  });
});

describe("given a tag is removed from the blog", () => {
  it("should display not display the tag as usedTags and again in unused tags", async () => {
    await renderTagChooser(["TypeScript"]);
    fireEvent.click(screen.getByText("TypeScript"));

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.REMOVE, "TypeScript");
  });
});
