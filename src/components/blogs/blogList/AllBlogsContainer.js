import React, { useEffect, useState } from "react";
import blogHelper from "../../../data/blogHelper";
import BlogList from "./BlogList";
import { convertFromRaw, EditorState } from "draft-js";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import styles from "./Blogs.module.css";
import Modal from "react-modal";
import FilterContainer from "../../filter/FilterContainer";
import { useBlogTagsContext } from "../../../hooks/BlogTags";
import tagOptions from "../../../hooks/TagOptions";
import FilterSummary from "../../filter/FilterSummary";
var dateFormat = require("dateformat");

const AllBlogsContainer = (props) => {
  const tagContext = useBlogTagsContext();
  const today = dateFormat(new Date(), "yyyy-mm-dd");

  const [blogs, setBlogs] = useState([]);
  const [nextToken, setNextToken] = useState();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterDate, setFilterDate] = useState(today);

  useEffect(() => {
    Modal.setAppElement("body");
    tagContext.onAlterTags(tagOptions.ON_RESET);
    fetch();
  }, []);

  function setEditorStateForBlogs(blogs) {
    blogs.forEach((blog) => {
      blog.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(blog.text))
      );
    });
  }

  async function fetch() {
    const blogsFromApi = await blogHelper.fetchBlogs(filterDate, null);
    setEditorStateForBlogs(blogsFromApi);
    setBlogs(blogsFromApi);
    setNextToken(blogsFromApi[blogsFromApi.length - 1].date);
  }

  async function fetchNext() {
    let nextBlogs = [];
    if (tagContext.usedTags.length > 0) {
      console.log("searching next with filter");
      nextBlogs = await blogHelper.getBlogsForTags(
        tagContext.usedTags,
        filterDate,
        nextToken
      );
    } else {
      nextBlogs = await blogHelper.fetchBlogs(filterDate, nextToken);
    }
    setEditorStateForBlogs(nextBlogs);
    setBlogs((prevData) => {
      const newBlogs = [...prevData, ...nextBlogs];
      return newBlogs;
    });
    nextBlogs.length === 0
      ? setNextToken(null)
      : setNextToken(nextBlogs[nextBlogs.length - 1].date);
  }

  function onEdit(blogId) {
    props.history.push(`/edit/${blogId}`);
  }

  async function onApplyFilter() {
    if (tagContext.usedTags.length === 0 && filterDate === today) {
      onClearAllFilter();
      return;
    }
    setShowFilterModal(false);
    if (tagContext.usedTags.length === 0) {
      fetch();
      return;
    }

    const filteredBlogs = await blogHelper.getBlogsForTags(
      tagContext.usedTags,
      filterDate
    );

    if (filteredBlogs.length > 0) {
      setNextToken(filteredBlogs[filteredBlogs.length - 1].date);
      setEditorStateForBlogs(filteredBlogs);
    }
    setBlogs(filteredBlogs);
  }

  async function onClearAllFilter() {
    setShowFilterModal(false);
    setFilterDate(today);
    tagContext.onAlterTags(tagOptions.ON_RESET);
    fetch();
  }

  function onOpenFilter() {
    setShowFilterModal(true);
  }

  function onChangeFilterDate(event) {
    setFilterDate(event.target.value);
  }

  return (
    <>
      <div className={styles.headerBar}>
        <h1>Today I Learned</h1>
        {!showFilterModal && (
          <FilterSummary
            onOpenFilter={onOpenFilter}
            tags={tagContext.usedTags}
            date={
              filterDate !== today
                ? dateFormat(new Date(filterDate), "dd.mm.yyyy")
                : null
            }
            x
          />
        )}
      </div>
      <Modal isOpen={showFilterModal} style={{ content: { top: "200px" } }}>
        <FilterContainer
          onFilter={onApplyFilter}
          onClear={onClearAllFilter}
          date={filterDate}
          onChangeDate={onChangeFilterDate}
        />
      </Modal>

      {!showFilterModal && (
        <div style={{ paddingTop: "1px" }}>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              return (
                <BlogList
                  blogs={blogs}
                  fetchNext={fetchNext}
                  nextToken={nextToken}
                  admin={isSignedIn}
                  onEdit={onEdit}
                />
              );
            }}
          </FirebaseAuthConsumer>
        </div>
      )}
    </>
  );
};

export default AllBlogsContainer;
