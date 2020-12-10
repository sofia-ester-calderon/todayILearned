import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";

const TagConfigurerContainer = ({ onClose, error }) => {
  const tagContext = useBlogTagsContext();

  const [unusedTags, setUnusedTags] = useState([]);
  const [usedTags, setUsedTags] = useState([]);
  const [tagData, setTagData] = useState({ name: "" });
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
    console.log("TAGS FROM GRAPHQL", tagsFromApi);
    setUsedAndUnusedTags(tagsFromApi);
    setLoading(false);
  }

  function setUsedAndUnusedTags(allTags) {
    setUsedTags(tagContext.blogTags.sort(compare));

    const blogTagIds = tagContext.blogTags.map((tag) => tag.id);

    const remainingTags = allTags.filter((tag) => !blogTagIds.includes(tag.id));
    setUnusedTags(remainingTags.sort(compare));
  }

  function onChangeTagName(event) {
    const { value } = event.target;
    setTagData({ name: value });
  }

  async function onCreateNewTag(event) {
    setErrors((prevData) => ({ ...prevData, create: null }));

    event.preventDefault();
    if (tagData.name === "") {
      return;
    }
    const allTags = [...unusedTags, ...usedTags];
    if (
      allTags.find(
        (tag) => tag.name.toUpperCase() === tagData.name.toUpperCase()
      )
    ) {
      setErrors((prevData) => ({ ...prevData, create: "Tag already exists" }));
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
        errors={errors}
      />
    </>
  );
};

export default TagConfigurerContainer;
