import React from "react";
import filterIcon from "../../assets/filter.png";
import TagList from "../tags/TagList";

const FilterSummary = ({ onOpenFilter, tags, date }) => {
  return (
    <div>
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
        {date && (
          <div
            style={{ cursor: "default", display: "inline-block" }}
            className="p-2 m-2 bg-light "
          >
            {date}
          </div>
        )}
        <TagList tags={tags} testId={"usedTags"} mode={"light"} />
      </div>
    </div>
  );
};

export default FilterSummary;
