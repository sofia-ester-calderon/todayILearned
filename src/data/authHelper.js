import firebase from "firebase/app";

const login = async (username, password) => {
  return await firebase.auth().signInWithEmailAndPassword(username, password);
};

const logout = async () => {
  await firebase.auth().signOut();
  console.log("logged out");
};

const authHelper = { login, logout };

export default authHelper;
