import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";
import tagOptions from "../../hooks/TagOptions";
var dateFormat = require("dateformat");

const TagConfigurerContainer = ({ onClose, error }) => {
  const today = dateFormat(new Date(), "yyyy-mm-dd");
  const tagContext = useBlogTagsContext();

  const [tagName, setTagName] = useState("");
  const [mutating, setMutating] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    setErrors((prevData) => ({ ...prevData, tag: error }));
  }, [error]);

  function onChangeTagName(event) {
    setTagName(event.target.value);
  }

  async function onCreateNewTag(event) {
    setErrors((prevData) => ({ ...prevData, create: null }));

    event.preventDefault();
    if (tagName === "") {
      return;
    }
    const allTags = [...tagContext.unusedTags, ...tagContext.usedTags];
    if (allTags.find((tag) => tag.toUpperCase() === tagName.toUpperCase())) {
      setErrors((prevData) => ({ ...prevData, create: "Tag already exists" }));
      return;
    }
    setMutating(true);
    await blogHelper.createTag(tagName);
    setTagName("");

    tagContext.onAlterTags(tagOptions.CREATE, tagName);

    setMutating(false);
  }

  async function onDeleteTag(event) {
    setErrors((prevData) => ({ ...prevData, create: null }));
    event.preventDefault();
    if (tagName === "") {
      return;
    }
    setMutating(true);

    const blogsWithTag = await blogHelper.getBlogsForTag(tagName, today);
    if (blogsWithTag.length > 0) {
      setMutating(false);
      setErrors((prevData) => ({
        ...prevData,
        create: "Tag cannot be deleted, because its being used by other blogs.",
      }));
      return;
    }
    await blogHelper.deleteTag(tagName);
    tagContext.onAlterTags(tagOptions.DELETE, tagName);
    setMutating(false);
  }

  async function onDeleteAllTags(event) {
    event.preventDefault();
    setMutating(true);
    const deletedTags = await blogHelper.deleteAllUnusedTags();
    deletedTags.forEach((tag) =>
      tagContext.onAlterTags(tagOptions.DELETE, tag)
    );
    setMutating(false);
  }

  return (
    <>
      <TagOverview
        tagName={tagName}
        onChangeTagName={onChangeTagName}
        onCreateTag={onCreateNewTag}
        onClose={onClose}
        mutating={mutating}
        errors={errors}
        onDeleteTag={onDeleteTag}
        onDeleteAllTags={onDeleteAllTags}
      />
    </>
  );
};

export default TagConfigurerContainer;
