import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/UserState";
import thumbnail from "../../assets/thumbnail.png";
import thumbnail2 from "../../assets/thumbnail2.png";

const MenuBar = () => {
  const userContext = useUserContext();

  return (
    <nav className="navbar navbar-light bg-light fixed-top ">
      <div className="navbar-brand">
        <NavLink className="nav-link" to={"/"} style={{ color: "black" }}>
          <img
            src={thumbnail2}
            width="45"
            height="45"
            className="d-inline-block align-top mr-2 rounded-circle"
            alt=""
          />
          <div
            style={{ float: "right", marginTop: "12px", fontSize: "medium" }}
          >
            Home
          </div>
        </NavLink>
      </div>
      {userContext.user.adminMode && (
        <div className="navbar-brand">
          <NavLink className="nav-link" to={"/new"} style={{ color: "black" }}>
            Create Blog
          </NavLink>
        </div>
      )}
      <div className="navbar-brand">
        <NavLink
          className="nav-link"
          to={"/aboutme"}
          style={{ color: "black" }}
        >
          <div style={{ float: "left", marginTop: "8px", fontSize: "medium" }}>
            About this page
          </div>
          <img
            src={thumbnail}
            width="45"
            height="45"
            className="d-inline-block align-top ml-2 rounded-circle"
            alt=""
          />
        </NavLink>
      </div>
    </nav>
  );
};

export default MenuBar;
