import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";

const TagConfigurerContainer = ({ onClose, error }) => {
  const tagContext = useBlogTagsContext();

  const [unusedTags, setUnusedTags] = useState([]);
  const [usedTags, setUsedTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (usedTags.length > 0) {
      tagContext.setBlogTags([...usedTags]);
    }
  }, [usedTags]);

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
    setUsedTags(tagContext.blogTags.sort(compare));

    const remainingTags = allTags.filter(
      (tag) => !tagContext.blogTags.includes(tag)
    );
    setUnusedTags(remainingTags.sort(compare));
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
    const allTags = [...unusedTags, ...usedTags];
    if (allTags.find((tag) => tag.toUpperCase() === tagName.toUpperCase())) {
      setErrors((prevData) => ({ ...prevData, create: "Tag already exists" }));
      return;
    }
    setMutating(true);
    await blogHelper.createTag(tagName);
    setTagName("");
    setUnusedTags((prevData) => {
      const newTags = [...prevData, tagName];
      return newTags.sort(compare);
    });
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
    setUnusedTags((prevData) => prevData.filter((tag) => tag !== tagName));
    setUsedTags((prevData) => prevData.filter((tag) => tag !== tagName));
    setMutating(false);
  }

  function onAddTagToBlog(blogTag) {
    setUsedTags((prevData) => {
      let tags = [...prevData, blogTag];
      tags = tags.sort(compare);
      return tags;
    });
    setUnusedTags((prevData) => prevData.filter((tag) => tag !== blogTag));
  }

  function onRemoveTagFromBlog(blogTag) {
    setUsedTags((prevData) => prevData.filter((tag) => tag !== blogTag));
    setUnusedTags((prevData) => {
      let tags = [...prevData, blogTag];
      tags = tags.sort(compare);
      return tags;
    });
  }

  function compare(a, b) {
    if (a.toUpperCase() < b.toUpperCase()) return -1;
    if (b.toUpperCase() > a.toUpperCase()) return 1;
    return 0;
  }

  return (
    <>
      <TagOverview
        unusedTags={unusedTags}
        usedTags={usedTags}
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
