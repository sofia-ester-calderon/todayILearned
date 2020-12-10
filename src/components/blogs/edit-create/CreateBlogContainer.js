import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { EditorState, convertToRaw } from "draft-js";
import TagConfigurerContainer from "../../tags/TagConfigurerContainer";
import Modal from "react-modal";
import { BlogTagsProvider, useBlogTagsContext } from "../../../hooks/BlogTags";

var dateFormat = require("dateformat");

const CreateBlogContainer = () => {
  const tagContext = useBlogTagsContext();

  const [newBlog, setNewBlog] = useState({
    title: "",
    date: dateFormat(new Date(), "yyyy-mm-dd"),
    tags: [],
    text: "",
  });
  const [editorText, setEditorText] = useState(EditorState.createEmpty());
  const [showTagModal, setShowTagModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(newBlog);
  }, [newBlog]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  function onChangeBlogInfo(event) {
    const { name, value } = event.target;
    setNewBlog((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function onChangeEditorText(event) {
    setNewBlog((prevDetails) => ({
      ...prevDetails,
      text: JSON.stringify(convertToRaw(event.getCurrentContent())),
    }));
    setEditorText(event);
  }

  function onConfigureTags(event) {
    event.preventDefault();
    setShowTagModal(true);
  }

  function onCloseModal() {
    if (tagContext.blogTags.length === 0) {
      setErrors({ tags: "A blog must have at least one tag!" });
      return;
    }
    setShowTagModal(false);
    setErrors({});
  }

  return (
    <div className="m-5">
      <h1 className="mb-4">Create Blog Post</h1>
      <BlogForm
        title={newBlog.title}
        date={newBlog.date}
        onChange={onChangeBlogInfo}
        editorState={editorText}
        onEditorChange={onChangeEditorText}
        onConfigureTags={onConfigureTags}
        hideEditor={showTagModal}
        tags={tagContext.blogTags}
      />
      <Modal isOpen={showTagModal}>
        <TagConfigurerContainer onClose={onCloseModal} error={errors.tags} />
      </Modal>
    </div>
  );
};

export default CreateBlogContainer;
