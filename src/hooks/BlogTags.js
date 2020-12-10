import React, { useContext, useState } from "react";

export const BlogTagsContext = React.createContext();

const BlogTagsProvider = ({ children }) => {
  const [blogTags, setBlogTags] = useState([]);

  return (
    <BlogTagsContext.Provider value={{ blogTags, setBlogTags }}>
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
