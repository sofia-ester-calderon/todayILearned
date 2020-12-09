import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { EditorState, convertToRaw } from "draft-js";
import TagConfigurerContainer from "../../tags/TagConfigurerContainer";
import Modal from "react-modal";

var dateFormat = require("dateformat");

const CreateBlogContainer = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    date: dateFormat(new Date(), "yyyy-mm-dd"),
    tags: [],
    text: "",
  });
  const [editorText, setEditorText] = useState(EditorState.createEmpty());
  const [showTagModal, setShowTagModal] = useState(false);

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
    setShowTagModal(false);
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
      />
      <Modal isOpen={showTagModal}>
        <TagConfigurerContainer onClose={onCloseModal} />
      </Modal>
    </div>
  );
};

export default CreateBlogContainer;
