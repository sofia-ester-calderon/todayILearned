import React, { useContext, useEffect, useState } from "react";
import authHelper from "../data/authHelper";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ session: false, adminMode: false });

  useEffect(() => {
    establishSession();
  }, []);

  useEffect(() => {
    console.log("current user?", user);
  }, [user]);

  async function establishSession() {
    try {
      const currentUser = await authHelper.getCurrentUser();
      setUser({ session: true, adminMode: false });
      if (
        currentUser.signInUserSession.accessToken.payload[
          "cognito:groups"
        ].includes("admin")
      ) {
        console.log("admin user is current session");
        setUser({ session: true, adminMode: true });
      } else {
        console.log("public user is current session");
      }
    } catch (e) {
      //login with def user
      console.log("no current session, logging in with public user");
      await authHelper.login(
        process.env.REACT_APP_PUBLIC_USER_USERNAME,
        process.env.REACT_APP_PUBLIC_USER_PASSWORD
      );
      setUser({ session: true, adminMode: false });
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("admin context can only be used inside UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };