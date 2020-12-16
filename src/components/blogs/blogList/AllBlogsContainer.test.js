import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AllBlogsContainer from "./AllBlogsContainer";
import { UserContext } from "../../../hooks/UserState";
import blogHelper from "../../../data/blogHelper";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const memoryHistory = createMemoryHistory();

function renderComponent(user) {
  const actualUser = user ? user : { session: true };
  render(
    <UserContext.Provider value={{ user: actualUser, setUser: jest.fn() }}>
      <Router history={memoryHistory}>
        <AllBlogsContainer history={memoryHistory} />
      </Router>
    </UserContext.Provider>
  );
}

describe("given the page is rendered", () => {
  it("shoud display all blogs from api", async () => {
    const blogs = {
      nextToken: "1234",
      total: 1,
      items: [
        {
          id: 1,
          date: "2020-12-01",
          tags: { items: [{ tag: { id: 1, name: "tag1" } }] },
          text:
            '{"blocks":[{"key":"9c8ie","text":"this is the text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      ],
    };
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent();

    await screen.findByText("December 01, 2020");
    await screen.findByText("this is the text");
    await screen.findByText("tag1");
  });
  it("should fetch and display the next blogs when scrolling down", async () => {
    const blogs = {
      nextToken: "1234",
      total: 1,
      items: [
        {
          id: 1,
          date: "2020-12-01",
          tags: { items: [] },
          text:
            '{"blocks":[{"key":"9c8ie","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      ],
    };
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent();

    await screen.findByText("December 01, 2020");

    const blogsNext = {
      nextToken: "1234",
      total: 1,
      items: [
        {
          id: 2,
          date: "2020-12-02",
          tags: { items: [] },
          text:
            '{"blocks":[{"key":"9c8ie","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      ],
    };
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogsNext);
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(blogHelper.fetchBlogs).toHaveBeenCalledWith(null, "1234");

    await screen.findByText("December 02, 2020");
  });
});

describe("given the user is admin", () => {
  it("should display the edit button", async () => {
    const blogs = {
      nextToken: "1234",
      total: 1,
      items: [
        {
          id: 1,
          date: "2020-12-01",
          tags: { items: [{ tag: { id: 1, name: "tag1" } }] },
          text:
            '{"blocks":[{"key":"9c8ie","text":"this is the text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      ],
    };
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent({ session: true, adminMode: true });

    await screen.findByText("Edit");
  });

  it("should render edit page if button is clicked", async () => {
    const blogs = {
      nextToken: "1234",
      total: 1,
      items: [
        {
          id: 1,
          date: "2020-12-01",
          tags: { items: [{ tag: { id: 1, name: "tag1" } }] },
          text:
            '{"blocks":[{"key":"9c8ie","text":"this is the text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      ],
    };
    blogHelper.fetchBlogs = jest.fn().mockResolvedValue(blogs);
    renderComponent({ session: true, adminMode: true });

    await screen.findByText("Edit");
    fireEvent.click(screen.getByText("Edit"));

    expect(memoryHistory.location.pathname).toBe("/edit/1");
  });
});
