import React from "react";
import TextInput from "../../common/text/TextInput";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagList from "../../tags/TagList";

const BlogForm = ({
  date,
  onChange,
  onEditorChange,
  editorState,
  errors = {},
  onConfigureTags,
  hideEditor,
  tags = [],
  onCreateBlog,
  onCancel,
  editMode,
  onDeleteBlog,
}) => {
  const toolbar = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
      "image",
    ],
    blockType: {
      inDropdown: true,
      options: ["Normal", "H3", "H4", "H5", "H6", "Blockquote", "Code"],
    },
    fontSize: {
      options: [10, 11, 12, 14, 16, 18, 24],
    },
    fontFamily: {
      options: ["Arial", "Courier New"],
    },
    textAlign: {
      options: ["left", "center", "right"],
    },
  };

  return (
    <div className="d-flex justify-content-center pt-5">
      <form className="w-50">
        <TextInput
          label="Date"
          name="date"
          value={date}
          onChange={onChange}
          error={errors.date}
          type="date"
        />
        <div style={{ marginLeft: "9px" }}>
          <div className="row">
            <TagList tags={tags} />
            <br />
          </div>
          {errors.tags && (
            <div role="alert" className="text-danger">
              {errors.tags}
            </div>
          )}
          <div className="row">
            <button
              onClick={onConfigureTags}
              style={{ marginLeft: "7px" }}
              className="btn btn-outline-secondary mt-2 mb-2"
            >
              Configure Tags
            </button>
          </div>
        </div>
        <br />

        {!hideEditor && (
          <div className="border mb-4 p-2">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorChange}
              toolbar={toolbar}
            />
          </div>
        )}
        <button className="btn btn-dark" onClick={onCreateBlog}>
          {editMode ? "Update Blog" : "Create Blog"}
        </button>
        {editMode && (
          <button className="btn btn-dark ml-4" onClick={onDeleteBlog}>
            Delete Blog
          </button>
        )}
        <button className="btn btn-secondary ml-4" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
