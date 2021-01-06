import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import blogHelper from "../../data/blogHelper";
import { BlogTagsContext } from "../../hooks/BlogTags";
import TagConfigurerContainer from "./TagConfigurerContainer";

const tags = ["React", "Java"];

const setBlogTags = jest.fn();

async function renderTagConfigurerContainer(blogTags) {
  const actualBlogTags = blogTags ? blogTags : [];
  const props = {
    onClose: jest.fn(),
  };
  blogHelper.fetchTags = jest.fn().mockResolvedValue(tags);
  render(
    <BlogTagsContext.Provider value={{ blogTags: actualBlogTags, setBlogTags }}>
      <TagConfigurerContainer {...props} />
    </BlogTagsContext.Provider>
  );
  await screen.findByText("Java");
}

describe("given the page is initially rendered", () => {
  it("should display all the tags alphabetically", async () => {
    await renderTagConfigurerContainer();

    const [tag1, tag2] = screen.getAllByTestId("unusedTags");

    expect(tag1.textContent).toBe("Java");
    expect(tag2.textContent).toBe("React");
  });

  it("should display all all tags and blog tags", async () => {
    await renderTagConfigurerContainer(["React"]);

    const [tag1] = screen.getAllByTestId("unusedTags");
    const [tag2] = screen.getAllByTestId("usedTags");

    expect(tag1.textContent).toBe("Java");
    expect(tag2.textContent).toBe("React");
  });
});

describe("given a tag is created", () => {
  it("should do nothing if field is empty", async () => {
    blogHelper.createTag = jest.fn();
    await renderTagConfigurerContainer();
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      fireEvent.click(screen.getByText("Create Tag"));
      expect(blogHelper.createTag).not.toHaveBeenCalled();
    });
  });

  it("should do nothing if tag name already exists", async () => {
    blogHelper.createTag = jest.fn();
    await renderTagConfigurerContainer(["React"]);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "react" },
    });
    fireEvent.click(screen.getByText("Create Tag"));
    screen.getByText("Tag already exists");
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(blogHelper.createTag).not.toHaveBeenCalled();
    });
  });

  it("should create the new tag and display it", async () => {
    blogHelper.createTag = jest.fn().mockResolvedValue();
    await renderTagConfigurerContainer();
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "TypeScript" },
    });
    fireEvent.click(screen.getByText("Create Tag"));
    expect(blogHelper.createTag).toHaveBeenCalledWith("TypeScript");

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      const [tag1, tag2, tag3] = screen.getAllByTestId("unusedTags");

      expect(tag1.textContent).toBe("Java");
      expect(tag2.textContent).toBe("React");
      expect(tag3.textContent).toBe("TypeScript");
    });
  });
});

describe("given a tag is added to the blog", () => {
  it("should display that tag as blog tag and remove from unused tags", async () => {
    await renderTagConfigurerContainer();
    fireEvent.click(screen.getByText("React"));

    const [tag1, tag2] = screen.getAllByTestId("unusedTags");

    expect(tag1.textContent).toBe("Java");
    expect(tag2).toBeUndefined();

    const [tag3] = screen.getAllByTestId("usedTags");
    expect(tag3.textContent).toBe("React");
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(setBlogTags).toHaveBeenCalledWith(["React"]);
    });
  });
});

describe("given a tag is removed from the blog", () => {
  it("should display not display the tag as usedTags and again in unused tags", async () => {
    await renderTagConfigurerContainer();
    fireEvent.click(screen.getByText("React"));
    fireEvent.click(screen.getByText("React"));

    const [tag1, tag2] = screen.getAllByTestId("unusedTags");

    expect(tag1.textContent).toBe("Java");
    expect(tag2.textContent).toBe("React");
    expect(screen.queryByTestId("usedTags")).not.toBeInTheDocument();
  });
});
