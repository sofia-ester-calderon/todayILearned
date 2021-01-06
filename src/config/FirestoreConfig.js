import firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

firebase.initializeApp(config);

const firestore = firebase.firestore();

export default firestore;
