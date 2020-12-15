import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./BlogList.module.css";

import BlogView from "./BlogView";

const BlogList = ({ blogs, fetchNext, nextToken }) => {
  return (
    <InfiniteScroll
      dataLength={blogs.length} //This is important field to render the next data
      next={fetchNext}
      hasMore={nextToken}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <ul className={styles.timeline}>
        {blogs.map((blog) => (
          <BlogView blog={blog} key={blog.id} />
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default BlogList;
