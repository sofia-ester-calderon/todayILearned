import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Blogs.module.css";

import BlogView from "./BlogView";

const BlogList = ({ blogs, fetchNext, nextToken, admin, onEdit }) => {
  return (
    <>
      {blogs.length === 0 ? (
        <p style={{ marginTop: "200px" }}>
          Sorry, no blogs found with these filters...
        </p>
      ) : (
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchNext}
          hasMore={nextToken}
          style={{ marginTop: "180px" }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <ul className={styles.timeline}>
            {blogs.map((blog) => (
              <BlogView
                blog={blog}
                key={blog.id}
                admin={admin}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
};

export default BlogList;
