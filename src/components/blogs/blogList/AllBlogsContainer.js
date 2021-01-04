import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../hooks/UserState";
import blogHelper from "../../../data/blogHelper";
import BlogList from "./BlogList";
import { convertFromRaw, EditorState, ContentState } from "draft-js";

const AllBlogsContainer = (props) => {
  const userContext = useUserContext();
  const [session, setSession] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [nextToken, setNextToken] = useState();

  useEffect(() => {
    setSession(userContext.user.session);
  }, [userContext]);

  useEffect(() => {
    if (session) {
      console.log("start");
      fetch();
    }
  }, [session]);

  function convertBlogsFromApi(blogs) {
    blogs.items.forEach((blog) => {
      // blog.editorState = EditorState.createWithContent(
      //   convertFromRaw(JSON.parse(blog.text))
      // );
      blog.editorState = EditorState.createWithContent(
        ContentState.createFromText("Hello")
      );
      const tags = blog.tags.items.map((tag) => {
        return {
          name: tag.tag.name,
          id: tag.tag.id,
        };
      });
      blog.tags = tags;
    });
  }

  async function fetch() {
    const blogsFromApi = await blogHelper.fetchBlogs();
    console.log("blogs from api", blogsFromApi);
    convertBlogsFromApi(blogsFromApi);
    setBlogs(blogsFromApi.items);
    setNextToken(blogsFromApi.nextToken);
  }

  async function fetchNext() {
    const blogsFromApi = await blogHelper.fetchBlogs(null, nextToken);

    convertBlogsFromApi(blogsFromApi);

    setBlogs((prevData) => {
      const newBlogs = [...prevData, ...blogsFromApi.items];
      return newBlogs;
    });
    setNextToken(blogsFromApi.nextToken);
  }

  function onEdit(blogId) {
    props.history.push(`/edit/${blogId}`);
  }

  return (
    <>
      <h1>Today I Learned</h1>
      {blogs.length > 0 && (
        <BlogList
          blogs={blogs}
          fetchNext={fetchNext}
          nextToken={nextToken}
          admin={userContext.user.adminMode}
          onEdit={onEdit}
        />
      )}
    </>
  );
};

export default AllBlogsContainer;
