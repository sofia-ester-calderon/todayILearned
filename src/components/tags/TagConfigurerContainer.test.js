import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import blogHelper from "../../data/blogHelper";
import TagConfigurerContainer from "./TagConfigurerContainer";

const tags = [
  {
    id: "3282d533-45f9-4257-b604-6362abfe336c",
    name: "Java",
  },
  {
    id: "7510e46a-5e6d-4cc6-abe0-efbc0b505a17",
    name: "React",
  },
];

async function renderTagConfigurerContainer() {
  blogHelper.fetchTags = jest.fn().mockResolvedValue(tags);

  render(<TagConfigurerContainer />);
  await screen.findByText("Java");
}

describe("given the page is initially rendered", () => {
  it("should display all the tags", async () => {
    await renderTagConfigurerContainer();

    const [tag1, tag2] = screen.getAllByTestId("allTags");

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

  it("should create the new tag and display it", async () => {
    blogHelper.createTag = jest.fn().mockResolvedValue({
      id: "0baaa6c6-8694-4704-b329-ea357b39bf9c",
      name: "TypeScript",
    });
    await renderTagConfigurerContainer();
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "TypeScript" },
    });
    fireEvent.click(screen.getByText("Create Tag"));
    expect(blogHelper.createTag).toHaveBeenCalledWith({ name: "TypeScript" });

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      const [tag1, tag2, tag3] = screen.getAllByTestId("allTags");

      expect(tag1.textContent).toBe("Java");
      expect(tag2.textContent).toBe("React");
      expect(tag3.textContent).toBe("TypeScript");
    });
  });
});

describe("given a tag is added to the blog", () => {
  it("should display that tag as blog tag and remove from all tags", async () => {
    await renderTagConfigurerContainer();
    fireEvent.click(screen.getByText("React"));

    const [tag1, tag2] = screen.getAllByTestId("allTags");

    expect(tag1.textContent).toBe("Java");
    expect(tag2).toBeUndefined();

    const [blogTag] = screen.getAllByTestId("blogTags");
    expect(blogTag.textContent).toBe("React");
  });
});

describe("given a tag is removed from the blog", () => {
  it("should display not display the tag as blogTags and again in all tags", async () => {
    await renderTagConfigurerContainer();
    fireEvent.click(screen.getByText("React"));
    fireEvent.click(screen.getByText("React"));

    const [tag1, tag2] = screen.getAllByTestId("allTags");

    expect(tag1.textContent).toBe("Java");
    expect(tag2.textContent).toBe("React");
    expect(screen.queryByTestId("allBlog")).not.toBeInTheDocument();
  });
});
