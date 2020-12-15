import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagList from "../../tags/TagList";
import styles from "./BlogList.module.css";
var dateFormat = require("dateformat");

const BlogView = ({ blog }) => {
  //   console.log(new Date(blog.date));
  return (
    <li key={blog.id}>
      <div className={styles.date}>
        {dateFormat(new Date(blog.date), "mmmm dd, yyyy")}
      </div>
      <div className="ml-5 mr-5 mb-4">
        <div className="row mt-3">
          <TagList tags={blog.tags} mode="light" />
        </div>
        <hr />

        <Editor
          editorState={blog.editorState}
          toolbarHidden={true}
          readOnly={true}
        />
      </div>
    </li>
  );
};

export default BlogView;
