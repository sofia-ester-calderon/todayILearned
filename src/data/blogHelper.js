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
  // const newBlog = await API.graphql({
  //   query: createBlogApi,
  //   variables: { input: blogData },
  // });
  // const blogId = newBlog.data.createBlog.id;
  // console.log("created blog", newBlog);
  // console.log("blog id", blogId);
  // tags.forEach((tag) => {
  //   const blogTagData = {
  //     blogID: blogId,
  //     tagID: tag.id,
  //   };
  //   API.graphql({
  //     query: createBlogTagApi,
  //     variables: { input: blogTagData },
  //   });
  // });
};

const updateBlog = async (blogData, newTags, oldTags) => {
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

const fetchBlogs = async (filter, nextToken) => {
  return {
    items: [
      {
        id: 1,
        date: "2020-12-01",
        text: '{"text": "Hello"}',
        tags: {
          items: [{ tag: { name: "Java", id: "1" } }],
        },
      },
    ],
  };
  // const blogs = await API.graphql(
  //   graphqlOperation(searchBlogs, {
  //     limit: 8,
  //     nextToken,
  //     filter,
  //     sort: {
  //       direction: "desc",
  //       field: "date",
  //     },
  //   })
  // );
  // return blogs.data.searchBlogs;
};

const getBlog = async (id) => {
  return {
    id: 1,
    date: "2020-12-01",
    text: "hello",
  };
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
