import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";

const TagConfigurerContainer = ({ onClose }) => {
  const [tags, setTags] = useState([]);
  const [tagData, setTagData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [blogTags, setBlogTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    setLoading(true);
    const tagsFromApi = await blogHelper.fetchTags();
    setTags(tagsFromApi.sort(compare));
    console.log("TAGS FROM GRAPHQL", tags);
    setLoading(false);
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
    setTags((prevData) => [...prevData, newTag]);
    setCreating(false);
  }

  function onAddTagToBlog(blogTag) {
    setBlogTags((prevData) => {
      let tags = [...prevData, blogTag];
      tags = tags.sort(compare);
      return tags;
    });
    setTags((prevData) => prevData.filter((tag) => tag.id !== blogTag.id));
  }

  function onRemoveTagFromBlog(blogTag) {
    setBlogTags((prevData) => prevData.filter((tag) => tag.id !== blogTag.id));
    setTags((prevData) => {
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
        tags={tags}
        blogTags={blogTags}
        tagName={tagData.name}
        onChangeTagName={onChangeTagName}
        onCreateTag={onCreateNewTag}
        onClose={onClose}
        loading={loading}
        creating={creating}
        onAddTag={onAddTagToBlog}
        onRemoveTag={onRemoveTagFromBlog}
      />
    </>
  );
};

export default TagConfigurerContainer;
