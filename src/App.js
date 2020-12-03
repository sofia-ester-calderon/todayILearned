import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Today I learned</h1>
        <p>In this page I will post my daily learnings</p>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
