import React from "react";
import TextInput from "../../common/text/TextInput";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const BlogForm = ({
  title,
  date,
  onChange,
  onEditorChange,
  editorState,
  errors = {},
  onConfigureTags,
  hideEditor,
  tags = [],
}) => {
  return (
    <div className="d-flex justify-content-center">
      <form className="w-50">
        <TextInput
          label="Title"
          name="title"
          value={title}
          onChange={onChange}
          error={errors.title}
        />
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
            {tags.map((tag) => (
              <div
                className={"p-2 bg-secondary text-white m-2"}
                key={tag.id}
                style={{ display: "inline-block", cursor: "default" }}
                data-testid="usedTags"
              >
                {tag.name}
              </div>
            ))}
            <br />
          </div>
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
          <span>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorChange}
            />
          </span>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
