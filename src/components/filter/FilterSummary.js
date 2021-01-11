import React from "react";
import filterIcon from "../../assets/filter.png";
import TagList from "../tags/TagList";

const FilterSummary = ({ onOpenFilter, tags }) => {
  return (
    <div style={{ textAlign: "left", marginLeft: "60px" }}>
      <button
        type="button"
        className="btn btn-outline-secondary mb-2"
        onClick={onOpenFilter}
      >
        <img
          src={filterIcon}
          width="15"
          height="15"
          className="d-inline-block mr-2"
          alt=""
        />
        Filter
      </button>
      <br />
      <div style={{ marginLeft: "-10px" }}>
        <TagList tags={tags} testId={"usedTags"} mode={"light"} />
      </div>
    </div>
  );
};

export default FilterSummary;
