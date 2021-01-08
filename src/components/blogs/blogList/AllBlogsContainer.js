import React, { useEffect, useState } from "react";
import blogHelper from "../../../data/blogHelper";
import BlogList from "./BlogList";
import { convertFromRaw, EditorState } from "draft-js";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import styles from "./Blogs.module.css";

const AllBlogsContainer = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [nextToken, setNextToken] = useState();

  useEffect(() => {
    fetch();
  }, []);

  function setEditorStateForBlogs(blogs) {
    blogs.forEach((blog) => {
      blog.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(blog.text))
      );
    });
  }

  async function fetch() {
    const blogsFromApi = await blogHelper.fetchBlogs(null);
    setEditorStateForBlogs(blogsFromApi);
    setBlogs(blogsFromApi);
    setNextToken(blogsFromApi[blogsFromApi.length - 1].date);
  }

  async function fetchNext() {
    const blogsFromApi = await blogHelper.fetchBlogs(nextToken);
    setEditorStateForBlogs(blogsFromApi);

    setBlogs((prevData) => {
      const newBlogs = [...prevData, ...blogsFromApi];
      return newBlogs;
    });
    blogsFromApi.length === 0
      ? setNextToken(null)
      : setNextToken(blogsFromApi[blogsFromApi.length - 1].date);
  }

  function onEdit(blogId) {
    props.history.push(`/edit/${blogId}`);
  }

  return (
    <>
      <div className={styles.headerBar}>
        <h1>Today I Learned</h1>
        <button>Filter</button>
      </div>
      {/* <Modal isOpen={true} style={{ content: { top: "240px" } }}>
        <FilterContainer />
      </Modal> */}

      {blogs.length > 0 && true && (
        <div style={{ paddingTop: "1px" }}>
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
        </div>
      )}
    </>
  );
};

export default AllBlogsContainer;
