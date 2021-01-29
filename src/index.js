import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import config from "./config/config";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import GA4React from "ga-4-react";

const ga4react = new GA4React(process.env.REACT_APP_GA_ID);
ga4react.initialize().then(
  (ga4) => {
    ga4.pageview("path");
    ga4.gtag("event", "pageview", "path"); // or your custom gtag event
  },
  (err) => {
    console.error(err);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <App />
      </FirebaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
