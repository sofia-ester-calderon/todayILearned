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
        <button onClick={onConfigureTags} className="btn btn-secondary mb-4">
          Configure Tags
        </button>
        <br />

        {!hideEditor && (
          <div className="mt-4">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorChange}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
