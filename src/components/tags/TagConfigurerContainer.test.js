import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import blogHelper from "../../data/blogHelper";
import { BlogTagsContext } from "../../hooks/BlogTags";
import tagOptions from "../../hooks/TagOptions";
import TagConfigurerContainer from "./TagConfigurerContainer";

const tags = ["React", "Java"];

const onAlterTags = jest.fn();
const setUsedTags = jest.fn();
const setUnusedTags = jest.fn();

async function renderTagConfigurerContainer(usedTags, unusedTags) {
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
      <TagConfigurerContainer {...props} />
    </BlogTagsContext.Provider>
  );
  await screen.findByText("Java");
}

describe("given the page is initially rendered", () => {
  it("should display all the tags", async () => {
    await renderTagConfigurerContainer();

    const [tag1, tag2] = screen.getAllByTestId("unusedTags");

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ON_INIT_UNUSED, tags);
    expect(tag1.textContent).toBe("React");
    expect(tag2.textContent).toBe("Java");
  });

  it("should display all all tags and blog tags", async () => {
    await renderTagConfigurerContainer(["React"], ["Java"]);

    const [tag1] = screen.getAllByTestId("unusedTags");
    const [tag2] = screen.getAllByTestId("usedTags");

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ON_INIT_UNUSED, [
      "Java",
    ]);

    expect(tag1.textContent).toBe("Java");
    expect(tag2.textContent).toBe("React");
  });
});

describe("given a tag is created", () => {
  it("should do nothing if field is empty", async () => {
    blogHelper.createTag = jest.fn();
    await renderTagConfigurerContainer();

    fireEvent.click(screen.getByText("Create Tag"));
    expect(blogHelper.createTag).not.toHaveBeenCalled();
  });

  it("should do nothing if tag name already exists", async () => {
    blogHelper.createTag = jest.fn();
    await renderTagConfigurerContainer(["React"]);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "react" },
    });
    fireEvent.click(screen.getByText("Create Tag"));
    screen.getByText("Tag already exists");
    expect(blogHelper.createTag).not.toHaveBeenCalled();
  });

  it("should create the new tag and display it", async () => {
    blogHelper.createTag = jest.fn().mockResolvedValue();
    await renderTagConfigurerContainer();
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "TypeScript" },
    });
    fireEvent.click(screen.getByText("Create Tag"));
    expect(blogHelper.createTag).toHaveBeenCalledWith("TypeScript");

    await waitFor(() => {
      expect(onAlterTags).toHaveBeenCalledWith(tagOptions.CREATE, "TypeScript");
    });
  });
});

describe("given a tag is deleted", () => {
  it("should not delete tag if it is used", async () => {
    blogHelper.getBlogsForTag = jest.fn().mockResolvedValue(["blog1"]);
    blogHelper.deleteTag = jest.fn();

    await renderTagConfigurerContainer();
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "React" },
    });
    fireEvent.click(screen.getByText("Delete Tag"));
    expect(blogHelper.getBlogsForTag).toHaveBeenCalledWith("React");
    expect(blogHelper.deleteTag).not.toHaveBeenCalled();
    await screen.findByText(
      "Tag cannot be deleted, because its being used by other blogs."
    );
  });

  it("should delete tag and not display it as unused tag", async () => {
    blogHelper.getBlogsForTag = jest.fn().mockResolvedValue([]);
    blogHelper.deleteTag = jest.fn().mockResolvedValue();

    await renderTagConfigurerContainer();
    screen.getByText("React");
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "React" },
    });

    fireEvent.click(screen.getByText("Delete Tag"));

    expect(blogHelper.getBlogsForTag).toHaveBeenCalledWith("React");

    await waitFor(() => {
      expect(blogHelper.deleteTag).toHaveBeenCalledWith("React");
      expect(onAlterTags).toHaveBeenCalledWith(tagOptions.DELETE, "React");
    });
  });
});

describe("given a tag is added to the blog", () => {
  it("should display that tag as blog tag and remove from unused tags", async () => {
    await renderTagConfigurerContainer();
    fireEvent.click(screen.getByText("React"));

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.ADD, "React");
  });
});

describe("given a tag is removed from the blog", () => {
  it("should display not display the tag as usedTags and again in unused tags", async () => {
    await renderTagConfigurerContainer(["TypeScript"]);
    fireEvent.click(screen.getByText("TypeScript"));

    expect(onAlterTags).toHaveBeenCalledWith(tagOptions.REMOVE, "TypeScript");
  });
});
