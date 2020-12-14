import React, { useContext, useEffect, useState } from "react";
import authHelper from "../data/authHelper";
import publicUser from "./publicuser.json";

export const AdminContext = React.createContext();

const AdminProvider = ({ children }) => {
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
      console.log("logged in with current session", currentUser);
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
      const user = await authHelper.login(
        publicUser.username,
        publicUser.password
      );
      setUser({ session: true, adminMode: false });
      console.log("logged in", user);
    }
  }

  return (
    <AdminContext.Provider value={{ user, setUser }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("admin context can only be used inside AdminProvider");
  }
  return context;
};

export { AdminProvider, useAdminContext };
