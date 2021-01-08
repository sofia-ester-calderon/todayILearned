import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";
import tagOptions from "../../hooks/TagOptions";

const TagConfigurerContainer = ({ onClose, error }) => {
  const tagContext = useBlogTagsContext();

  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    setErrors((prevData) => ({ ...prevData, tag: error }));
  }, [error]);

  async function fetchTags() {
    setLoading(true);
    const tagsFromApi = await blogHelper.fetchTags();
    setUsedAndUnusedTags(tagsFromApi);
    setLoading(false);
  }

  function setUsedAndUnusedTags(allTags) {
    const remainingTags = allTags.filter(
      (tag) => !tagContext.usedTags.includes(tag)
    );
    tagContext.onAlterTags(tagOptions.ON_INIT_UNUSED, remainingTags);
  }

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

    const blogsWithTag = await blogHelper.getBlogsForTag(tagName);
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

  function onAddTagToBlog(blogTag) {
    tagContext.onAlterTags(tagOptions.ADD, blogTag);
  }

  function onRemoveTagFromBlog(blogTag) {
    tagContext.onAlterTags(tagOptions.REMOVE, blogTag);
  }

  return (
    <>
      <TagOverview
        unusedTags={tagContext.unusedTags}
        usedTags={tagContext.usedTags}
        tagName={tagName}
        onChangeTagName={onChangeTagName}
        onCreateTag={onCreateNewTag}
        onClose={onClose}
        loading={loading}
        mutating={mutating}
        onAddTag={onAddTagToBlog}
        onRemoveTag={onRemoveTagFromBlog}
        errors={errors}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
};

export default TagConfigurerContainer;
