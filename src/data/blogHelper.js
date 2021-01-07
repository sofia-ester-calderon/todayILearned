import collections from "../config/FirestoreConfig";

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

const getBlogsForTag = async (tag) => {
  const blogs = [];
  const snapshot = await collections.blogs
    .where("tags", "array-contains", tag)
    .get();
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
  const limit = 15;
  // const queryRef = await ref.where("date", "==", "2021-01-01").get();
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
};

export default blogHelper;
