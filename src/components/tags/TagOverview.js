import React from "react";

const TagOverview = ({
  tags = [],
  blogTags = [],
  tagName,
  onChangeTagName,
  onCreateTag,
  onDeleteTag,
  onClose,
  loading,
  creating,
  onAddTag,
  onRemoveTag,
}) => {
  return (
    <>
      <h1 className="d-flex justify-content-center mb-5">Tags</h1>

      {blogTags.length > 0 && <h4>Blog Tags</h4>}
      {blogTags.map((tag) => (
        <div
          className={"p-2 bg-secondary text-white m-2"}
          key={tag.id}
          style={{ cursor: "pointer", display: "inline-block" }}
          onClick={() => onRemoveTag(tag)}
          data-testid="blogTags"
        >
          {tag.name}
        </div>
      ))}
      <hr />
      <div>
        {loading ? (
          <div className="spinner-border " role="status" data-testid="spinner">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          tags.map((tag) => (
            <div
              className={"p-2 bg-light m-2"}
              key={tag.id}
              style={{ cursor: "pointer", display: "inline-block" }}
              onClick={() => onAddTag(tag)}
              data-testid="allTags"
            >
              {tag.name}
            </div>
          ))
        )}
      </div>
      <hr />
      <div className="form-group row mt-5 w-50">
        <label
          className="font-weight-bold col-2 col-form-label"
          htmlFor="tagName"
          style={{ textAlign: "left" }}
        >
          Name
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

        <div className="col-6">
          <button className="btn btn-dark mb-4 mr-3" onClick={onCreateTag}>
            Create Tag
          </button>
          <button className="btn btn-dark mb-4 mr-3" onClick={onDeleteTag}>
            Delete Tag
          </button>
          {creating && (
            <div
              className="spinner-border"
              role="status"
              data-testid="spinner-create"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center mb-5">
        <button className="btn btn-dark mb-4 w-25" onClick={onClose}>
          Done
        </button>
      </div>
    </>
  );
};

export default TagOverview;
