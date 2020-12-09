import React, { useEffect, useState } from "react";
import TagOverview from "./TagOverview";
import blogHelper from "../../data/blogHelper";

const TagConfigurerContainer = () => {
  const [tags, setTags] = useState([]);
  const [tagData, setTagData] = useState({ name: "" });

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    const tagsFromApi = await blogHelper.fetchTags();
    setTags(tagsFromApi);
    console.log("TAGS FROM GRAPHQL", tags);
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
    const newTag = await blogHelper.createTag(tagData);
    setTagData({ name: "" });
    setTags((prevData) => [...prevData, newTag]);
  }

  return (
    <>
      <TagOverview
        tags={tags}
        tagName={tagData.name}
        onChangeTagName={onChangeTagName}
        onCreateTag={onCreateNewTag}
      />
    </>
  );
};

export default TagConfigurerContainer;
