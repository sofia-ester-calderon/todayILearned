import firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

console.log("config", config);

firebase.initializeApp(config);

const firestore = firebase.firestore();

const collections = {
  blogs: firestore.collection("blogs"),
  tags: firestore.collection("tags"),
};

export default collections;
