import React, { useContext, useEffect, useState } from "react";

const AdminContext = React.createContext();

const AdminProvider = ({ children }) => {
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    console.log("admin mode?", adminMode);
  }, [adminMode]);

  return (
    <AdminContext.Provider value={{ adminMode, setAdminMode }}>
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
