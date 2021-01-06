import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";

const TagConfigurerContainer = ({ onClose, error }) => {
  const tagContext = useBlogTagsContext();

  const [unusedTags, setUnusedTags] = useState([]);
  const [usedTags, setUsedTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
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
    setNewTag(event.target.value);
  }

  async function onCreateNewTag(event) {
    setErrors((prevData) => ({ ...prevData, create: null }));

    event.preventDefault();
    if (newTag === "") {
      return;
    }
    const allTags = [...unusedTags, ...usedTags];
    if (allTags.find((tag) => tag.toUpperCase() === newTag.toUpperCase())) {
      setErrors((prevData) => ({ ...prevData, create: "Tag already exists" }));
      return;
    }
    setCreating(true);
    await blogHelper.createTag(newTag);
    setNewTag("");
    setUnusedTags((prevData) => {
      const newTags = [...prevData, newTag];
      return newTags.sort(compare);
    });
    setCreating(false);
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
        tagName={newTag}
        onChangeTagName={onChangeTagName}
        onCreateTag={onCreateNewTag}
        onClose={onClose}
        loading={loading}
        creating={creating}
        onAddTag={onAddTagToBlog}
        onRemoveTag={onRemoveTagFromBlog}
        errors={errors}
      />
    </>
  );
};

export default TagConfigurerContainer;
