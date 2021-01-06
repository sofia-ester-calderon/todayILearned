import React from "react";

const TagList = ({ tags = [], onClick, testId, mode = "dark" }) => {
  let className = "p-2 m-2";
  className =
    mode === "dark"
      ? className + " bg-secondary text-white"
      : className + " bg-light m-2";
  const cursor = onClick ? "pointer" : "default";
  return (
    <>
      {tags.map((tag) => (
        <div
          className={className}
          key={tag}
          style={{ cursor: cursor, display: "inline-block" }}
          onClick={onClick ? () => onClick(tag) : () => {}}
          data-testid={testId}
        >
          {tag}
        </div>
      ))}
    </>
  );
};

export default TagList;
