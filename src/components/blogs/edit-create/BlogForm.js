import React from "react";
import TextInput from "../../common/text/TextInput";
import { EditorState, ContentState } from "draft-js";
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
}) => {
  //   const [editorState, setEditorState] = React.useState(() =>
  //     EditorState.createWithContent(ContentState.createFromText("Hello"))
  //   );

  //   const onEditorStateChange = (editorState) => {
  //     setEditorState(editorState);
  //   };
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
      <button>Add Tag</button>
      {tags.map((tag) => (
        <p key={tag}>{tag}</p>
      ))}

      <Editor editorState={editorState} onEditorStateChange={onEditorChange} />
    </form>
  );
};

export default BlogForm;
