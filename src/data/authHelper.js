import { Auth } from "aws-amplify";

const login = async (username, password) => {
  return await Auth.signIn(username, password);
};

const getCurrentUser = async () => {
  return await Auth.currentAuthenticatedUser();
};

const authHelper = { login, getCurrentUser };

export default authHelper;
