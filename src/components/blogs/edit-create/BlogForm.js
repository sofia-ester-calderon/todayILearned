import React from "react";
import TextInput from "../../common/text/TextInput";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const BlogForm = ({
  title,
  date,
  newTag,
  tags = [],
  onChange,
  onEditorChange,
  editorState,
  errors = {},
  onAddTag,
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
        <TextInput
          label="New Tag"
          name="tag"
          value={newTag}
          onChange={onChange}
        />
        <button onClick={onAddTag} className="btn btn-secondary mb-4">
          Add Tag
        </button>
        <br />
        {tags.map((tag) => (
          <div className={"d-inline p-2 bg-secondary text-white m-2"} key={tag}>
            {tag}
          </div>
        ))}

        <div className="mt-4">
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorChange}
          />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
