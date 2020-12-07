import { Auth } from "aws-amplify";

const login = async (username, password) => {
  return await Auth.signIn(username, password);
};

const authHelper = { login };

export default authHelper;
