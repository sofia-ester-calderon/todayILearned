import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import blogHelper from "../../data/blogHelper";
import { BlogTagsContext } from "../../hooks/BlogTags";
import tagOptions from "../../hooks/TagOptions";
import TagConfigurerContainer from "./TagConfigurerContainer";

const tags = ["React", "Java"];

const onAlterTags = jest.fn();

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
