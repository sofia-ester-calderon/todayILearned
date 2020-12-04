import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listBlogs } from "./graphql/queries";
import {
  createBlog as createBlogGraphQL,
  deleteBlog as deleteBlogGraphQL,
} from "./graphql/mutations";
import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const apiData = await API.graphql({ query: listBlogs });
    console.log(apiData);
    setBlogs(apiData.data.listBlogs.items);
  }

  async function createBlog() {
    if (!formData.name || !formData.text) return;
    console.log(formData);
    await API.graphql({
      query: createBlogGraphQL,
      variables: { input: formData },
    });
    setBlogs([...blogs, formData]);
    setFormData({ name: "", text: "" });
  }

  async function deleteNote({ id }) {
    const newNotesArray = blogs.filter((note) => note.id !== id);
    setBlogs(newNotesArray);
    await API.graphql({
      query: deleteBlogGraphQL,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
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
        <button onClick={createBlog}>Create Blog</button>
        <div style={{ marginBottom: 30 }}>
          {blogs.map((blog) => (
            <div key={blog.id || blog.name}>
              <h2>{blog.name}</h2>
              <p>{blog.text}</p>
              <button onClick={() => deleteNote(blog)}>Delete note</button>
            </div>
          ))}
        </div>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
