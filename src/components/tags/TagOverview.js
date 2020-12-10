import React from "react";
import TagList from "./TagList";

const TagOverview = ({
  unusedTags = [],
  usedTags = [],
  tagName,
  onChangeTagName,
  onCreateTag,
  onDeleteTag,
  onClose,
  loading,
  creating,
  onAddTag,
  onRemoveTag,
  error,
}) => {
  return (
    <>
      <h1 className="d-flex justify-content-center mb-5">Tags</h1>

      <h4>Blog Tags</h4>
      {usedTags.length === 0 && !loading && <p>No tags chosen yet</p>}
      <TagList tags={usedTags} onClick={onRemoveTag} testId={"usedTags"} />

      <hr />
      <div>
        {loading ? (
          <div className="spinner-border " role="status" data-testid="spinner">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <TagList
            tags={unusedTags}
            onClick={onAddTag}
            testId={"unusedTags"}
            mode={"light"}
          />
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
      <div className="d-flex justify-content-center mb-2">
        <button className="btn btn-dark mb-4 w-25" onClick={onClose}>
          Done
        </button>
      </div>
      {error && (
        <div
          role="alert"
          className="text-danger d-flex justify-content-center "
        >
          {error}
        </div>
      )}
    </>
  );
};

export default TagOverview;
