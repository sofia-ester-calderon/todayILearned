import React from "react";

const TagOverview = ({
  tags = [],
  tagName,
  onChangeTagName,
  onCreateTag,
  onDeleteTag,
  onClose,
  loading,
  creating,
}) => {
  return (
    <div className="test">
      <h1 className="d-flex justify-content-center mb-5">Tags</h1>
      <div
      // style={{
      //   display: "flex",
      // }}
      >
        {loading ? (
          <div className="spinner-border " role="status" data-testid="spinner">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          tags.map((tag) => (
            <div
              className={"p-2 bg-secondary text-white m-2"}
              key={tag.id}
              style={{ cursor: "pointer", display: "inline-block" }}
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
    </div>
  );
};

export default TagOverview;
