import RoutingComponent from "./components/routing/RoutingComponent";
import { UserProvider } from "./hooks/UserState";
import { BlogTagsProvider } from "./hooks/BlogTags";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <UserProvider>
        <BlogTagsProvider>
          <RoutingComponent />
        </BlogTagsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
