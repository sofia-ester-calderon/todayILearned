import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AllBlogsContainer from "./AllBlogsContainer";
import blogHelper from "../../../data/blogHelper";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { BlogTagsContext } from "../../../hooks/BlogTags";

const memoryHistory = createMemoryHistory();

const mockContext = jest.fn();
jest.mock("@react-firebase/auth", () => ({
  FirebaseAuthConsumer: ({ children }) => children(mockContext()),
}));

function renderComponent() {
  mockContext.mockReset();
  mockContext.mockReturnValue({ isSignedIn: true });
  render(
    <Router history={memoryHistory}>
      <BlogTagsContext.Provider
        value={{
          usedTags: [],
          unusedTags: [],
          onAlterTags: jest.fn(),
        }}
      >
        <AllBlogsContainer history={memoryHistory} />
      </BlogTagsContext.Provider>
    </Router>
  );
}

describe("given the page is rendered", () => {
  it("shoud display all blogs from api", async () => {
    const blogs = [
      {
        id: 1,
        date: "2020-12-01",
        tags: ["tag1"],
        text:
          '{"blocks":[{"key":"9c8ie","text":"this is the text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    ];

    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent();

    await screen.findByText("December 01, 2020");
    await screen.findByText("this is the text");
    await screen.findByText("tag1");
  });
  it("should fetch and display the next blogs when scrolling down", async () => {
    const blogs = [
      {
        id: 1,
        date: "2020-12-01",
        tags: [],
        text:
          '{"blocks":[{"key":"9c8ie","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    ];

    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent();

    await screen.findByText("December 01, 2020");

    const blogsNext = [
      {
        id: 2,
        date: "2020-12-02",
        tags: [],
        text:
          '{"blocks":[{"key":"9c8ie","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    ];

    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogsNext);
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(blogHelper.fetchBlogs).toHaveBeenCalledWith(
      "2021-01-11",
      "2020-12-01"
    );

    await screen.findByText("December 02, 2020");
  });
});

describe("given the user is admin", () => {
  it("should display the edit button", async () => {
    const blogs = [
      {
        id: 1,
        date: "2020-12-01",
        tags: [],
        text:
          '{"blocks":[{"key":"9c8ie","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    ];
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent({ session: true, adminMode: true });

    await screen.findByText("Edit");
  });

  it("should render edit page if button is clicked", async () => {
    const blogs = [
      {
        id: 1,
        date: "2020-12-01",
        tags: [],
        text:
          '{"blocks":[{"key":"9c8ie","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    ];
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent({ session: true, adminMode: true });

    await screen.findByText("Edit");
    fireEvent.click(screen.getByText("Edit"));

    expect(memoryHistory.location.pathname).toBe("/edit/1");
  });
});

// describe("given filter is applied", () => {
//   it("should open the filter modal", async () => {
//     renderComponent();
//     fireEvent.click(screen.getByText("Filter"));

//     screen.getByText("Filter");
//   });
// });
