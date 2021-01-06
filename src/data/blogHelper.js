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
  // const queryRef = await ref.where("date", "==", "2021-01-01").get();
  let snapshot;
  if (last) {
    snapshot = await collections.blogs
      .orderBy("date", "desc")
      .limit(10)
      .startAfter(last)
      .get();
  } else {
    snapshot = await collections.blogs.orderBy("date", "desc").limit(3).get();
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

const blogHelper = {
  fetchTags,
  createTag,
  createBlog,
  fetchBlogs,
  getBlog,
  updateBlog,
};

export default blogHelper;
