import React from "react";
import TagChooser from "../tags/TagChooser";

const FilterContainer = ({ onClose }) => {
  return (
    <>
      <h2 className="d-flex justify-content-center mb-5">Filter</h2>
      <h4 className="ml-2">Tags</h4>
      <TagChooser />
      <div className="d-flex justify-content-center mb-2">
        <button className="btn btn-dark w-25 mt-4" onClick={onClose}>
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default FilterContainer;
