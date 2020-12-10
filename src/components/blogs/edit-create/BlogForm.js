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
        <button
          onClick={onConfigureTags}
          className="btn btn-outline-secondary mb-4"
        >
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
