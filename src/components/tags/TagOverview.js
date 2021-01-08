import React from "react";
import TagChooser from "./TagChooser";

const TagOverview = ({
  tagName,
  onChangeTagName,
  onCreateTag,
  onDeleteTag,
  onClose,
  mutating,
  errors = {},
}) => {
  return (
    <>
      <h1 className="d-flex justify-content-center mb-5">Tags</h1>
      <h4>Blog Tags</h4>
      <TagChooser />
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
          {mutating && (
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
      {errors.create && (
        <div role="alert" className="text-danger">
          {errors.create}
        </div>
      )}
      <hr />
      <div className="d-flex justify-content-center mb-2">
        <button className="btn btn-dark mb-4 w-25" onClick={onClose}>
          Done
        </button>
      </div>
      {errors.tag && (
        <div
          role="alert"
          className="text-danger d-flex justify-content-center "
        >
          {errors.tag}
        </div>
      )}
    </>
  );
};

export default TagOverview;
