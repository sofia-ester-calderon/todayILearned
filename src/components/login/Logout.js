import React, { useEffect } from "react";
import authHelper from "../../data/authHelper";

const Logout = () => {
  useEffect(() => {
    authHelper.logout();
  }, []);
  return <></>;
};

export default Logout;
