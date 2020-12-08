import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { EditorState, convertToRaw } from "draft-js";
var dateFormat = require("dateformat");

const CreateBlogContainer = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    date: dateFormat(new Date(), "yyyy-mm-dd"),
    tags: [],
    text: "",
  });
  const [editorText, setEditorText] = useState(EditorState.createEmpty());
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    console.log(newBlog);
  }, [newBlog]);

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
    if (name === "tag") {
      setNewTag(value);
    }
  }

  function onChangeEditorText(event) {
    setNewBlog((prevDetails) => ({
      ...prevDetails,
      text: JSON.stringify(convertToRaw(event.getCurrentContent())),
    }));
    setEditorText(event);
  }

  function onAddTag(event) {
    event.preventDefault();
    setNewBlog((prevDetails) => ({
      ...prevDetails,
      tags: [...prevDetails.tags, newTag],
    }));
    setNewTag("");
  }

  return (
    <>
      <h1>Create Blog Post</h1>
      <BlogForm
        title={newBlog.title}
        date={newBlog.date}
        tags={newBlog.tags}
        onChange={onChangeBlogInfo}
        editorState={editorText}
        onEditorChange={onChangeEditorText}
        newTag={newTag}
        onAddTag={onAddTag}
      />
    </>
  );
};

export default CreateBlogContainer;
