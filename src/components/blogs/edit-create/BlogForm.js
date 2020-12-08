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
    <form>
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
      <button onClick={onAddTag}>Add Tag</button>
      {tags.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}

      <Editor editorState={editorState} onEditorStateChange={onEditorChange} />
    </form>
  );
};

export default BlogForm;
