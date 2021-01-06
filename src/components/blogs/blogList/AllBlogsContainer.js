import React, { useEffect, useState } from "react";
import blogHelper from "../../../data/blogHelper";
import BlogList from "./BlogList";
import { convertFromRaw, EditorState, ContentState } from "draft-js";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

const AllBlogsContainer = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [nextToken, setNextToken] = useState();

  useEffect(() => {
    console.log("start");
    fetch();
  }, []);

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
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            return (
              <BlogList
                blogs={blogs}
                fetchNext={fetchNext}
                nextToken={nextToken}
                admin={isSignedIn}
                onEdit={onEdit}
              />
            );
          }}
        </FirebaseAuthConsumer>
      )}
    </>
  );
};

export default AllBlogsContainer;
