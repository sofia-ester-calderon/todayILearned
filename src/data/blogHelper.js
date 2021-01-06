// import { API, graphqlOperation } from "aws-amplify";
// import { listTags } from "../graphql/queries";
// import {
//   searchBlogs,
//   listBlogTags,
//   getBlog as getBlogApi,
// } from "../graphql/queries-custom";
// import {
//   createTag as createTagApi,
//   createBlog as createBlogApi,
//   createBlogTag as createBlogTagApi,
//   updateBlog as updateBlogApi,
//   deleteBlogTag,
// } from "../graphql/mutations";

import firestore from "../config/FirestoreConfig";

const fetchTags = async () => {
  return {
    id: "1",
    name: "Java",
  };
  // const apiData = await API.graphql({ query: listTags });
  // return apiData.data.listTags.items;
};

const createTag = async (tagData) => {
  // const newTag = await API.graphql({
  //   query: createTagApi,
  //   variables: { input: tagData },
  // });
  // return newTag.data.createTag;
};

const createBlog = async (blogData, tags) => {
  await firestore.collection("blogs").add({
    date: blogData.date,
    text: blogData.text,
  });
};

const updateBlog = async (blogData, newTags, oldTags) => {
  const id = blogData.id;
  const blog = { date: blogData.date, text: blogData.text };
  const res = await firestore.collection("blogs").doc(id).set(blog);
  console.log("updated blog", res);
  // for (const tagId of oldTags) {
  //   console.log("deleting blogtag", tagId);
  //   await API.graphql({
  //     query: deleteBlogTag,
  //     variables: { input: { id: tagId } },
  //   });
  // }
  // const newBlog = await API.graphql({
  //   query: updateBlogApi,
  //   variables: { input: blogData },
  // });
  // console.log("updated blog", newBlog);
  // newTags.forEach((tag) => {
  //   const blogTagData = {
  //     blogID: blogData.id,
  //     tagID: tag.id,
  //   };
  //   API.graphql({
  //     query: createBlogTagApi,
  //     variables: { input: blogTagData },
  //   });
  // });
};

const fetchBlogs = async (last) => {
  const ref = firestore.collection("blogs");
  const blogs = [];
  // const queryRef = await ref.where("date", "==", "2021-01-01").get();
  const queryRef = await ref.orderBy("date").limit(3).startAfter(last).get();

  queryRef.forEach((doc) => {
    blogs.push({ ...doc.data(), ...{ id: doc.id } });
  });
  return blogs;
};

const getBlog = async (id) => {
  const ref = firestore.collection("blogs");
  const queryRef = await ref.doc(id).get();
  return queryRef.data();

  // const blog = await API.graphql({
  //   query: getBlogApi,
  //   variables: { id },
  // });
  // return blog.data.getBlog;
};

const fetchBlogsForTags = async () => {
  // let filterBlogTags = {
  //   and: [
  //     {
  //       tagID: { eq: "b9d9e410-3b2c-4fe5-ad8d-b097ce818b52" },
  //     },
  //     {
  //       tagID: { eq: "0a64177b-1444-407e-917d-8dd6de982b1a" },
  //     },
  //   ],
  // };
  // // find blogs for tagID
  // const blogTagsFromApi = await API.graphql(
  //   graphqlOperation(listBlogTags, { limit: 10, filter: filterBlogTags })
  // );
  // console.log("blogTag Java: ", blogTagsFromApi);
};

const filterBlogs = async () => {
  // let filter = { date: { gt: "2020-12-07" } };
  // const blogsFromAuthHelperNT = await blogHelper.fetchBlogs(
  //   null,
  //   "1607040000000"
  // );
  // console.log("from auth helper with next token: ", blogsFromAuthHelperNT);
  // const blogsFromAuthHelperFilter = await blogHelper.fetchBlogs(filter);
  // console.log("from auth helper with filter: ", blogsFromAuthHelperFilter);
  // const blogsFromAuthHelperFilterNT = await blogHelper.fetchBlogs(
  //   filter,
  //   "1607644800000"
  // );
  // console.log(
  //   "from auth helper with filter and next token: ",
  //   blogsFromAuthHelperFilterNT
  // );
};

const blogHelper = {
  fetchTags,
  createTag,
  createBlog,
  fetchBlogs,
  getBlog,
  updateBlog,
};

export default blogHelper;

// async function deleteBlog({ id }) {
//   const newNotesArray = blogs.filter((note) => note.id !== id);
//   setBlogs(newNotesArray);
//   await API.graphql({
//     query: deleteBlogGraphQL,
//     variables: { input: { id } },
//   });
// }
