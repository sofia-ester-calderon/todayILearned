import { API } from "aws-amplify";
import { listTags } from "../graphql/queries";
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

const blogHelper = { fetchTags, createTag, createBlog };

export default blogHelper;

// console.log("created join tabe: ", tableJoin);
//     const blogsFromApi = await API.graphql({ query: listBlogs });
//     console.log("fetched blogs: ", blogsFromApi);
//     const tagsFromApi = await API.graphql({ query: listTags });
//     console.log("fetched tags: ", tagsFromApi);
//     const joinTableFromApi = await API.graphql({ query: listBlogTags });
//     console.log("fetched table join: ", joinTableFromApi);
//     console.log("blog tags?", blogsFromApi.data.listBlogs.items[0].tags);
//     const getBlog1 = await API.graphql({
//       query: getBlog,
//       variables: { id: "7e0c3d80-da0e-452b-878e-a8c59b873f5a" },
//     });
//     console.log("blog", getBlog1);
