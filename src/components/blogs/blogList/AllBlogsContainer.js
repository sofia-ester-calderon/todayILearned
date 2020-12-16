import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../hooks/UserState";
import blogHelper from "../../../data/blogHelper";
import BlogList from "./BlogList";
import { convertFromRaw, EditorState } from "draft-js";

const AllBlogsContainer = () => {
  const adminState = useUserContext();
  const [session, setSession] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [nextToken, setNextToken] = useState();

  useEffect(() => {
    setSession(adminState.user.session);
  }, [session, adminState]);

  useEffect(() => {
    if (session) {
      console.log("start");
      fetch();
    }
  }, [session]);

  function convertBlogsFromApi(blogs) {
    blogs.items.forEach((blog) => {
      blog.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(blog.text))
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

  return (
    <>
      <h1>Today I Learned</h1>
      {blogs.length > 0 && (
        <BlogList blogs={blogs} fetchNext={fetchNext} nextToken={nextToken} />
      )}
    </>
  );
};

export default AllBlogsContainer;
