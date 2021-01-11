import collections from "../config/FirestoreConfig";

const limit = 30;

const fetchTags = async () => {
  const tags = [];
  const snapshot = await collections.tags.get();

  snapshot.forEach((doc) => {
    tags.push(doc.data().name);
  });
  return tags;
};

const createTag = async (name) => {
  await collections.tags.add({
    name,
  });
};

const deleteTag = async (name) => {
  const tagIds = [];
  const snapshot = await collections.tags.where("name", "==", name).get();

  snapshot.forEach((doc) => {
    tagIds.push(doc.id);
  });

  for (const id of tagIds) {
    await collections.tags.doc(id).delete();
  }
};

const getBlogsForTags = async (tags, last) => {
  let blogs = await getBlogsForTag(tags[0], last);
  console.log("blogs for 1st tag", tags[0], blogs.length);

  console.log("checking rest of filters");

  const filteredBlogs = await filterNext(blogs, tags);
  return filteredBlogs;
};

const filterNext = async (blogs, tags) => {
  for (const [i, value] of tags.entries()) {
    if (i === 0) continue;
    console.log("next tag", value);
    let filteredBlogs = blogs.filter((blog) => blog.tags.includes(value));
    console.log("blogs filtered again", filteredBlogs.length);
    if (filteredBlogs.length === 0) {
      if (blogs.length === 0) return [];
      const last = blogs[blogs.length - 1].date;
      console.log("no blogs left for this filter, fetching more after", last);
      let nextBlogs = await getBlogsForTag(tags[0], last);
      console.log("got next batch of blogs", nextBlogs.length);
      if (nextBlogs.length > 0) {
        console.log("filtering again");
        filteredBlogs = filterNext(nextBlogs, tags);
      }
    }
    console.log("blogs for this filter, returning", filteredBlogs.length);
    blogs = filteredBlogs;
  }
  console.log("returning", blogs);
  return blogs;
};

const getBlogsForTag = async (tag, last) => {
  const blogs = [];

  let snapshot;
  if (last) {
    snapshot = await collections.blogs
      .where("tags", "array-contains", tag)
      .orderBy("date", "desc")
      .limit(limit)
      .startAfter(last)
      .get();
  } else {
    snapshot = await collections.blogs
      .where("tags", "array-contains", tag)
      .orderBy("date", "desc")
      .limit(limit)
      .get();
  }

  console.log("blogs with tag", snapshot.size);

  snapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), ...{ id: doc.id } });
  });
  return blogs;
};

const createBlog = async (blogData, tags) => {
  await collections.blogs.add({
    date: blogData.date,
    text: blogData.text,
    tags,
  });
};

const updateBlog = async (blogData, tags) => {
  await collections.blogs
    .doc(blogData.id)
    .set({ date: blogData.date, text: blogData.text, tags: tags });
};

const fetchBlogs = async (last) => {
  const blogs = [];

  let snapshot;
  if (last) {
    snapshot = await collections.blogs
      .orderBy("date", "desc")
      .limit(limit)
      .startAfter(last)
      .get();
  } else {
    snapshot = await collections.blogs
      .orderBy("date", "desc")
      .limit(limit)
      .get();
  }

  snapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), ...{ id: doc.id } });
  });
  return blogs;
};

const getBlog = async (id) => {
  const snapshot = await collections.blogs.doc(id).get();
  return { ...snapshot.data(), ...{ id: snapshot.id } };
};

const deleteBlog = async (id) => {
  await collections.blogs.doc(id).delete();
};

const blogHelper = {
  fetchTags,
  createTag,
  createBlog,
  fetchBlogs,
  getBlog,
  updateBlog,
  getBlogsForTag,
  deleteTag,
  deleteBlog,
  getBlogsForTags,
};

export default blogHelper;
