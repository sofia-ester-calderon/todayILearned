import React from "react";

const TagList = ({ tags = [], onClick, testId, mode = "dark" }) => {
  let className = "p-2 m-2";
  className =
    mode === "dark"
      ? className + " bg-secondary text-white"
      : className + " bg-light m-2";
  return (
    <>
      {tags.map((tag) => (
        <div
          className={className}
          key={tag.id}
          style={{ cursor: "pointer", display: "inline-block" }}
          onClick={() => onClick(tag)}
          data-testid={testId}
        >
          {tag.name}
        </div>
      ))}
    </>
  );
};

export default TagList;
