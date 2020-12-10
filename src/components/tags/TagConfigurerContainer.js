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
    setTags(tagsFromApi);
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
    setBlogTags((prevData) => [...prevData, blogTag]);
    setTags((prevData) => prevData.filter((tag) => tag.id !== blogTag.id));
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
      />
    </>
  );
};

export default TagConfigurerContainer;
