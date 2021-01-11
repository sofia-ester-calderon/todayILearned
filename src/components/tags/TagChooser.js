import React, { useEffect, useState } from "react";
import blogHelper from "../../data/blogHelper";
import { useBlogTagsContext } from "../../hooks/BlogTags";
import tagOptions from "../../hooks/TagOptions";
import TagList from "./TagList";

const TagChooser = () => {
  const tagContext = useBlogTagsContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tagContext.allTags.length === 0) {
      fetchTags();
    } else {
      setUsedAndUnusedTags(tagContext.allTags);
    }
  }, []);

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

  function onAddTagToBlog(blogTag) {
    tagContext.onAlterTags(tagOptions.ADD, blogTag);
  }

  function onRemoveTagFromBlog(blogTag) {
    tagContext.onAlterTags(tagOptions.REMOVE, blogTag);
  }

  return (
    <>
      {tagContext.usedTags.length === 0 && !loading && (
        <p className="ml-3 mt-4">No tags chosen</p>
      )}
      <TagList
        tags={tagContext.usedTags}
        onClick={onRemoveTagFromBlog}
        testId={"usedTags"}
      />

      <hr />
      <div>
        {loading ? (
          <div className="spinner-border " role="status" data-testid="spinner">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <TagList
            tags={tagContext.unusedTags}
            onClick={onAddTagToBlog}
            testId={"unusedTags"}
            mode={"light"}
          />
        )}
      </div>
    </>
  );
};

export default TagChooser;
