import React from "react";
import TagChooser from "../tags/TagChooser";

const FilterContainer = ({ onFilter, onClear, date, onChangeDate }) => {
  return (
    <>
      <h2 className="d-flex justify-content-center mb-5">Filter</h2>
      <h4 className="ml-2">Tags</h4>
      <TagChooser />
      <h4 className="ml-2 mt-4">Start Date</h4>
      <input
        id="date"
        name="date"
        value={date}
        onChange={onChangeDate}
        className="form-control ml-2 mt-3"
        style={{ width: "180px" }}
        type="date"
      />
      <div className="d-flex justify-content-center mb-2">
        <button className="btn btn-dark w-20 mt-4 mr-4" onClick={onClear}>
          Clear All
        </button>
        <button className="btn btn-dark w-20 mt-4" onClick={onFilter}>
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default FilterContainer;
