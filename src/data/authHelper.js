import firebase from "firebase/app";

const login = async (username, password) => {
  return await firebase.auth().signInWithEmailAndPassword(username, password);
};

const authHelper = { login };

export default authHelper;
