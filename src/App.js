import RoutingComponent from "./components/routing/RoutingComponent";
import { BlogTagsProvider } from "./hooks/BlogTags";
import MenuBar from "./components/menu/MenuBar";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <BlogTagsProvider>
        <MenuBar />
        <div style={{ marginTop: "110px" }}>
          <RoutingComponent />
        </div>
      </BlogTagsProvider>
    </div>
  );
}

export default App;
