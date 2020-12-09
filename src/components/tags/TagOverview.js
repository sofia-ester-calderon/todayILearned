import React from "react";

const TagOverview = ({
  tags = [],
  tagName,
  onChangeTagName,
  onCreateTag,
  onDeleteTag,
}) => {
  return (
    <>
      <h1>Tags</h1>
      {tags.map((tag) => (
        <div
          className={"d-inline p-2 bg-secondary text-white m-2"}
          key={tag.id}
          style={{ cursor: "pointer" }}
        >
          {tag.name}
        </div>
      ))}
      <br />
      <div className="form-group row">
        <label
          className="font-weight-bold col-4 col-form-label"
          htmlFor="tagName"
          style={{ textAlign: "left" }}
        >
          Tag Name
        </label>

        <div className="col">
          <input
            id="tagName"
            name="tagName"
            value={tagName}
            onChange={onChangeTagName}
            className="form-control"
          />
        </div>

        <div className="col-2">
          <button className="btn btn-dark mb-4" onClick={onCreateTag}>
            Create Tag
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-dark mb-4" onClick={onDeleteTag}>
            Delete Tag
          </button>
        </div>
      </div>
    </>
  );
};

export default TagOverview;
