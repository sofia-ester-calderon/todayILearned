import collections from "../config/FirestoreConfig";

const filterLimit = 100;
const allLimit = 30;

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

const getBlogsForTags = async (tags, date, last) => {
  console.log(tags, date, last);
  let blogs = await getBlogsForTag(tags[0], date, last);

  const filteredBlogs = await filterNext(blogs, date, tags);
  return filteredBlogs;
};

const filterNext = async (blogs, date, tags) => {
  for (const [i, value] of tags.entries()) {
    if (i === 0) continue;
    let filteredBlogs = blogs.filter((blog) => blog.tags.includes(value));
    if (filteredBlogs.length === 0) {
      if (blogs.length === 0) return [];
      const last = blogs[blogs.length - 1].date;
      let nextBlogs = await getBlogsForTag(tags[0], date, last);
      if (nextBlogs.length > 0) {
        filteredBlogs = filterNext(nextBlogs, tags);
      }
    }
    blogs = filteredBlogs;
  }
  return blogs;
};

const getBlogsForTag = async (tag, date, last) => {
  const blogs = [];

  let snapshot;
  if (last) {
    snapshot = await collections.blogs
      .where("tags", "array-contains", tag)
      .where("date", "<=", date)
      .orderBy("date", "desc")
      .limit(filterLimit)
      .startAfter(last)
      .get();
  } else {
    snapshot = await collections.blogs
      .where("tags", "array-contains", tag)
      .where("date", "<=", date)
      .orderBy("date", "desc")
      .limit(filterLimit)
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

const fetchBlogs = async (date, last) => {
  const blogs = [];

  let snapshot;
  if (last) {
    snapshot = await collections.blogs
      .where("date", "<=", date)
      .orderBy("date", "desc")
      .limit(allLimit)
      .startAfter(last)
      .get();
  } else {
    snapshot = await collections.blogs
      .where("date", "<=", date)
      .orderBy("date", "desc")
      .limit(allLimit)
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
