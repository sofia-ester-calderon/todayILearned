import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API, Storage } from "aws-amplify";
import { listBlogs } from "./graphql/queries";
import {
  createBlog as createBlogGraphQL,
  deleteBlog as deleteBlogGraphQL,
} from "./graphql/mutations";
import { useEffect, useState } from "react";
import RoutingComponent from "./components/routing/RoutingComponent";

function App() {
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const apiData = await API.graphql({ query: listBlogs });
    const blogsFromAPI = apiData.data.listBlogs.items;
    await Promise.all(
      blogsFromAPI.map(async (blog) => {
        if (blog.image) {
          const image = await Storage.get(blog.image);
          blog.image = image;
        }
        return blog;
      })
    );
    setBlogs(apiData.data.listBlogs.items);
  }

  async function createBlog() {
    if (!formData.name || !formData.text) return;
    await API.graphql({
      query: createBlogGraphQL,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBlogs([...blogs, formData]);
    setFormData({ name: "", text: "" });
  }

  async function deleteBlog({ id }) {
    const newNotesArray = blogs.filter((note) => note.id !== id);
    setBlogs(newNotesArray);
    await API.graphql({
      query: deleteBlogGraphQL,
      variables: { input: { id } },
    });
  }

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBlogs();
  }

  return (
    <div className="App">
      <RoutingComponent />
      <header className="App-header">
        <h1>Today I learned</h1>
        <p>In this page I will post my daily learnings</p>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Blog name"
          value={formData.name}
        />
        <input
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          placeholder="Blog description"
          value={formData.text}
        />
        <input type="file" onChange={onChange} />
        <button onClick={createBlog}>Create Blog</button>
        <div style={{ marginBottom: 30 }}>
          {blogs.map((blog) => (
            <div key={blog.id || blog.name}>
              <h2>{blog.name}</h2>
              <p>{blog.text}</p>
              <button onClick={() => deleteBlog(blog)}>Delete blog</button>
              {blog.image && <img src={blog.image} style={{ width: 400 }} />}
            </div>
          ))}
        </div>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
