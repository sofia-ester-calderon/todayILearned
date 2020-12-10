import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";

const TagConfigurerContainer = ({ onClose, error }) => {
  const tagContext = useBlogTagsContext();

  const [unusedTags, setUnusedTags] = useState([]);
  const [usedTags, setUsedTags] = useState([...tagContext.blogTags]);
  const [tagData, setTagData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (usedTags.length > 0) {
      tagContext.setBlogTags([...usedTags]);
    }
  }, [usedTags]);

  async function fetchTags() {
    setLoading(true);
    const tagsFromApi = await blogHelper.fetchTags();
    console.log("TAGS FROM GRAPHQL", tagsFromApi);
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
    const { value } = event.target;
    setTagData({ name: value });
  }

  async function onCreateNewTag(event) {
    event.preventDefault();
    if (tagData.name === "") {
      return;
    }
    setCreating(true);
    const newTag = await blogHelper.createTag(tagData);
    setTagData({ name: "" });
    setUnusedTags((prevData) => [...prevData, newTag]);
    setCreating(false);
  }

  function onAddTagToBlog(blogTag) {
    setUsedTags((prevData) => {
      let tags = [...prevData, blogTag];
      tags = tags.sort(compare);
      return tags;
    });
    setUnusedTags((prevData) =>
      prevData.filter((tag) => tag.id !== blogTag.id)
    );
  }

  function onRemoveTagFromBlog(blogTag) {
    setUsedTags((prevData) => prevData.filter((tag) => tag.id !== blogTag.id));
    setUnusedTags((prevData) => {
      let tags = [...prevData, blogTag];
      tags = tags.sort(compare);
      return tags;
    });
  }

  function compare(a, b) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
    return 0;
  }

  return (
    <>
      <TagOverview
        unusedTags={unusedTags}
        usedTags={usedTags}
        tagName={tagData.name}
        onChangeTagName={onChangeTagName}
        onCreateTag={onCreateNewTag}
        onClose={onClose}
        loading={loading}
        creating={creating}
        onAddTag={onAddTagToBlog}
        onRemoveTag={onRemoveTagFromBlog}
        error={error}
      />
    </>
  );
};

export default TagConfigurerContainer;
