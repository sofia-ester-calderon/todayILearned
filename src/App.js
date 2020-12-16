import RoutingComponent from "./components/routing/RoutingComponent";
import { UserProvider } from "./hooks/UserState";
import { BlogTagsProvider } from "./hooks/BlogTags";
import MenuBar from "./components/menu/MenuBar";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <UserProvider>
        <BlogTagsProvider>
          <MenuBar />
          <div style={{ marginTop: "110px" }}>
            <RoutingComponent />
          </div>
        </BlogTagsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
