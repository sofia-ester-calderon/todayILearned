import React, { useState } from "react";
import BlogForm from "./BlogForm";

const CreateBlogContainer = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    date: "",
    tags: [],
    text: "",
  });

  function onChangeBlogInfo(event) {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    if (name === "title" || name === "date") {
      setNewBlog((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  }

  return (
    <>
      <h1>Create Blog Post</h1>
      <BlogForm
        title={newBlog.title}
        date={newBlog.date}
        tags={newBlog.tags}
        onChange={onChangeBlogInfo}
      />
    </>
  );
};

export default CreateBlogContainer;
