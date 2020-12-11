import RoutingComponent from "./components/routing/RoutingComponent";
import { AdminProvider } from "./hooks/AdminState";
import { BlogTagsProvider } from "./hooks/BlogTags";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <AdminProvider>
        <BlogTagsProvider>
          <RoutingComponent />
        </BlogTagsProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
