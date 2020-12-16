import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { EditorState, convertToRaw } from "draft-js";
import TagConfigurerContainer from "../../tags/TagConfigurerContainer";
import Modal from "react-modal";
import { useBlogTagsContext } from "../../../hooks/BlogTags";
import blogHelper from "../../../data/blogHelper";

var dateFormat = require("dateformat");

const CreateBlogContainer = (props) => {
  const tagContext = useBlogTagsContext();

  const [newBlog, setNewBlog] = useState({
    title: "",
    date: dateFormat(new Date(), "yyyy-mm-dd"),
    text: "",
  });
  const [editorText, setEditorText] = useState(EditorState.createEmpty());
  const [showTagModal, setShowTagModal] = useState(false);
  const [errors, setErrors] = useState({});

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
      setErrors({ tags: "A blog must have at least one tag" });
      return;
    }
    setShowTagModal(false);
    setErrors({});
  }

  async function onCreateBlog(event) {
    event.preventDefault();
    console.log("blog: ", newBlog);
    console.log("tags: ", tagContext.blogTags);

    if (isFormValid()) {
      await blogHelper.createBlog(newBlog, tagContext.blogTags);
      tagContext.setBlogTags([]);
      props.history.push("/");
    }
  }

  function isFormValid() {
    const blogErrors = {};
    if (!newBlog.title || newBlog.title === "") {
      blogErrors.title = "Please enter a title";
    }
    if (!newBlog.date || newBlog.date === "") {
      blogErrors.date = "Please enter a valid date";
    }
    if (tagContext.blogTags.length === 0) {
      blogErrors.tags = "A blog must have at least one tag";
    }
    setErrors(blogErrors);
    return Object.keys(blogErrors).length === 0;
  }

  function onCancel(event) {
    event.preventDefault();
    tagContext.setBlogTags([]);
    props.history.push("/");
  }

  return (
    <>
      <BlogForm
        title={newBlog.title}
        date={newBlog.date}
        onChange={onChangeBlogInfo}
        editorState={editorText}
        onEditorChange={onChangeEditorText}
        onConfigureTags={onConfigureTags}
        hideEditor={showTagModal}
        tags={tagContext.blogTags}
        onCreateBlog={onCreateBlog}
        errors={errors}
        onCancel={onCancel}
      />
      <Modal isOpen={showTagModal}>
        <TagConfigurerContainer onClose={onCloseModal} error={errors.tags} />
      </Modal>
    </>
  );
};

export default CreateBlogContainer;
