import React, { useContext, useEffect, useState } from "react";
import tagOptions from "./TagOptions";

export const BlogTagsContext = React.createContext();

const BlogTagsProvider = ({ children }) => {
  const [usedTags, setUsedTags] = useState([]);
  const [unusedTags, setUnusedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const allTags = [...unusedTags, ...usedTags];
    setAllTags(allTags.sort(compare));
  }, [usedTags, unusedTags]);

  function onAlterTags(type, tagValue) {
    switch (type) {
      case tagOptions.ADD:
        setUsedTags((prevData) => {
          let tags = [...prevData, tagValue];
          tags = tags.sort(compare);
          return tags;
        });
        setUnusedTags((prevData) => prevData.filter((tag) => tag !== tagValue));
        break;
      case tagOptions.REMOVE:
        setUsedTags((prevData) => prevData.filter((tag) => tag !== tagValue));
        setUnusedTags((prevData) => {
          let tags = [...prevData, tagValue];
          tags = tags.sort(compare);
          return tags;
        });
        break;
      case tagOptions.CREATE:
        setUnusedTags((prevData) => {
          const newTags = [...prevData, tagValue];
          return newTags.sort(compare);
        });
        break;
      case tagOptions.DELETE:
        setUnusedTags((prevData) => prevData.filter((tag) => tag !== tagValue));
        setUsedTags((prevData) => prevData.filter((tag) => tag !== tagValue));
        break;
      case tagOptions.ON_INIT_UNUSED:
        setUnusedTags(tagValue.sort(compare));
        break;
      case tagOptions.ON_RESET:
        setUnusedTags((prevData) => {
          let tags = [...prevData, ...usedTags];
          return tags.sort(compare);
        });
        setUsedTags([]);
        break;
      case tagOptions.ON_INIT_USED:
        setUsedTags(tagValue);
        break;
      default:
        console.log("type does not exist");
    }
  }

  function compare(a, b) {
    if (a.toUpperCase() < b.toUpperCase()) return -1;
    if (b.toUpperCase() > a.toUpperCase()) return 1;
    return 0;
  }

  const tagContext = {
    usedTags,
    unusedTags,
    allTags,
    onAlterTags,
  };

  return (
    <BlogTagsContext.Provider value={tagContext}>
      {children}
    </BlogTagsContext.Provider>
  );
};

const useBlogTagsContext = () => {
  const context = useContext(BlogTagsContext);
  if (context === undefined) {
    throw new Error(
      "blog tags context can only be used inside BlogTagsProvider"
    );
  }
  return context;
};

export { BlogTagsProvider, useBlogTagsContext };
