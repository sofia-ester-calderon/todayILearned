import { API, graphqlOperation } from "aws-amplify";
import { listTags } from "../graphql/queries";
import { searchBlogs, listBlogTags } from "../graphql/queries-custom";
import {
  createTag as createTagApi,
  createBlog as createBlogApi,
  createBlogTag as createBlogTagApi,
} from "../graphql/mutations";

const fetchTags = async () => {
  const apiData = await API.graphql({ query: listTags });
  return apiData.data.listTags.items;
};

const createTag = async (tagData) => {
  const newTag = await API.graphql({
    query: createTagApi,
    variables: { input: tagData },
  });
  return newTag.data.createTag;
};

const createBlog = async (blogData, tags) => {
  const newBlog = await API.graphql({
    query: createBlogApi,
    variables: { input: blogData },
  });
  const blogId = newBlog.data.createBlog.id;
  console.log("created blog", newBlog);
  console.log("blog id", blogId);

  for (const tag of tags) {
    const blogTagData = {
      blogID: blogId,
      tagID: tag.id,
    };
    const newBlogTag = await API.graphql({
      query: createBlogTagApi,
      variables: { input: blogTagData },
    });
    console.log("created blogtag", newBlogTag);
  }
  tags.forEach((tag) => {
    // TODO add it here once you're sure it works
  });
};

const fetchBlogs = async (filter, nextToken) => {
  const blogs = await API.graphql(
    graphqlOperation(searchBlogs, {
      limit: 8,
      nextToken,
      filter,
      sort: {
        direction: "desc",
        field: "date",
      },
    })
  );
  return blogs.data.searchBlogs;
};

const fetchBlogsFotTags = async () => {
  let filterBlogTags = {
    and: [
      {
        tagID: { eq: "b9d9e410-3b2c-4fe5-ad8d-b097ce818b52" },
      },
      {
        tagID: { eq: "0a64177b-1444-407e-917d-8dd6de982b1a" },
      },
    ],
  };

  // find blogs for tagID
  const blogTagsFromApi = await API.graphql(
    graphqlOperation(listBlogTags, { limit: 10, filter: filterBlogTags })
  );

  console.log("blogTag Java: ", blogTagsFromApi);
};

const filterBlogs = async () => {
  let filter = { date: { gt: "2020-12-07" } };
  const blogsFromAuthHelperNT = await blogHelper.fetchBlogs(
    null,
    "1607040000000"
  );
  console.log("from auth helper with next token: ", blogsFromAuthHelperNT);

  const blogsFromAuthHelperFilter = await blogHelper.fetchBlogs(filter);
  console.log("from auth helper with filter: ", blogsFromAuthHelperFilter);

  const blogsFromAuthHelperFilterNT = await blogHelper.fetchBlogs(
    filter,
    "1607644800000"
  );
  console.log(
    "from auth helper with filter and next token: ",
    blogsFromAuthHelperFilterNT
  );
};

const blogHelper = { fetchTags, createTag, createBlog, fetchBlogs };

export default blogHelper;

//     const getBlog1 = await API.graphql({
//       query: getBlog,
//       variables: { id: "7e0c3d80-da0e-452b-878e-a8c59b873f5a" },
//     });
//     console.log("blog", getBlog1);

// async function deleteBlog({ id }) {
//   const newNotesArray = blogs.filter((note) => note.id !== id);
//   setBlogs(newNotesArray);
//   await API.graphql({
//     query: deleteBlogGraphQL,
//     variables: { input: { id } },
//   });
// }
