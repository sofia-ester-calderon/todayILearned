import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import TagConfigurerContainer from "../../tags/TagConfigurerContainer";
import Modal from "react-modal";
import { useBlogTagsContext } from "../../../hooks/BlogTags";
import blogHelper from "../../../data/blogHelper";
import AreYouSure from "../../common/modal/AreYouSure";
import tagOptions from "../../../hooks/TagOptions";

var dateFormat = require("dateformat");

const CrupdateBlogContainer = (props) => {
  const emptyBlog = {
    date: dateFormat(new Date(), "yyyy-mm-dd"),
    text: "",
  };

  const tagContext = useBlogTagsContext();

  const [blogData, setBlogData] = useState(emptyBlog);
  const [editorText, setEditorText] = useState(EditorState.createEmpty());
  const [showTagModal, setShowTagModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hideEditor, setHideEditor] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (showConfirmModal || showTagModal) {
      setHideEditor(true);
    } else {
      setHideEditor(false);
    }
  }, [showConfirmModal, showTagModal]);

  useEffect(() => {
    if (props.match.params.id) {
      getBlog();
    } else {
      setBlogData(emptyBlog);
      setEditorText(EditorState.createEmpty());
      tagContext.onAlterTags(tagOptions.ON_RESET);
    }
  }, [props.match.params.id]);

  async function getBlog() {
    tagContext.onAlterTags(tagOptions.ON_RESET);
    const blog = await blogHelper.getBlog(props.match.params.id);
    setBlogData(blog);
    setEditorText(
      EditorState.createWithContent(convertFromRaw(JSON.parse(blog.text)))
    );
    tagContext.onAlterTags(tagOptions.ON_INIT_USED, blog.tags);
  }

  function onChangeBlogInfo(event) {
    const { name, value } = event.target;
    setBlogData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function onChangeEditorText(event) {
    setBlogData((prevDetails) => ({
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
    if (tagContext.usedTags.length === 0) {
      setErrors({ tags: "A blog must have at least one tag" });
      return;
    }
    setShowTagModal(false);
    setErrors({});
  }

  async function onCreateBlog(event) {
    event.preventDefault();

    if (isFormValid()) {
      if (props.match.params.id) {
        await blogHelper.updateBlog(blogData, tagContext.usedTags);
      } else {
        await blogHelper.createBlog(blogData, tagContext.usedTags);
      }
      tagContext.onAlterTags(tagOptions.ON_RESET);
      props.history.push("/");
    }
  }

  function isFormValid() {
    const blogErrors = {};
    if (!blogData.date || blogData.date === "") {
      blogErrors.date = "Please enter a valid date";
    }
    if (tagContext.usedTags.length === 0) {
      blogErrors.tags = "A blog must have at least one tag";
    }
    setErrors(blogErrors);
    return Object.keys(blogErrors).length === 0;
  }

  function onCancel(event) {
    event.preventDefault();
    tagContext.onAlterTags(tagOptions.ON_RESET);
    props.history.push("/");
  }

  function onDeleteBlog(event) {
    event.preventDefault();
    setShowConfirmModal(true);
  }

  function onDenyDeletion() {
    setShowConfirmModal(false);
  }

  async function onConfirmDeletion() {
    await blogHelper.deleteBlog(blogData.id);
    tagContext.onAlterTags(tagOptions.ON_RESET);
    props.history.push("/");
  }

  return (
    <>
      <BlogForm
        date={blogData.date}
        onChange={onChangeBlogInfo}
        editorState={editorText}
        onEditorChange={onChangeEditorText}
        onConfigureTags={onConfigureTags}
        hideEditor={hideEditor}
        tags={tagContext.usedTags}
        onCreateBlog={onCreateBlog}
        errors={errors}
        onCancel={onCancel}
        editMode={props.match.params.id}
        onDeleteBlog={onDeleteBlog}
      />
      <Modal isOpen={showTagModal} style={{ content: { top: "130px" } }}>
        <TagConfigurerContainer onClose={onCloseModal} error={errors.tags} />
      </Modal>
      <AreYouSure
        open={showConfirmModal}
        onNo={onDenyDeletion}
        onYes={onConfirmDeletion}
      />
    </>
  );
};

export default CrupdateBlogContainer;
