import firestore from "../config/FirestoreConfig";

const fetchTags = async () => {
  const ref = firestore.collection("tags");
  const tags = [];
  const queryRef = await ref.get();

  queryRef.forEach((doc) => {
    tags.push(doc.data().name);
  });
  console.log("got tags", tags);
  return tags;
};

const createTag = async (name) => {
  await firestore.collection("tags").add({
    name,
  });
};

const createBlog = async (blogData, tags) => {
  await firestore.collection("blogs").add({
    date: blogData.date,
    text: blogData.text,
  });
};

const updateBlog = async (blogData, tags) => {
  const id = blogData.id;
  const blog = { date: blogData.date, text: blogData.text, tags: tags };
  await firestore.collection("blogs").doc(id).set(blog);
};

const fetchBlogs = async (last) => {
  const ref = firestore.collection("blogs");
  const blogs = [];
  // const queryRef = await ref.where("date", "==", "2021-01-01").get();
  let queryRef;
  if (last) {
    queryRef = await ref
      .orderBy("date", "desc")
      .limit(10)
      .startAfter(last)
      .get();
  } else {
    queryRef = await ref.orderBy("date", "desc").limit(3).get();
  }

  queryRef.forEach((doc) => {
    blogs.push({ ...doc.data(), ...{ id: doc.id } });
  });
  return blogs;
};

const getBlog = async (id) => {
  const ref = firestore.collection("blogs");
  const queryRef = await ref.doc(id).get();
  return { ...queryRef.data(), ...{ id: queryRef.id } };
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
