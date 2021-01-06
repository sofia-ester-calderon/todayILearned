import React from "react";
import { NavLink } from "react-router-dom";
import womanIcon from "../../assets/woman.png";
import homeIcon from "../../assets/head.png";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

const MenuBar = () => {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        return (
          <nav className="navbar navbar-light bg-light fixed-top ">
            <div className="navbar-brand">
              <NavLink className="nav-link" to={"/"} style={{ color: "black" }}>
                <img
                  src={homeIcon}
                  width="45"
                  height="45"
                  className="d-inline-block align-top mr-2"
                  alt=""
                />
                <div
                  style={{
                    float: "right",
                    marginTop: "12px",
                    fontSize: "medium",
                  }}
                >
                  Home
                </div>
              </NavLink>
            </div>
            {isSignedIn && (
              <div className="navbar-brand">
                <NavLink
                  className="nav-link"
                  to={"/new"}
                  style={{ color: "black" }}
                >
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
                <div
                  style={{
                    float: "left",
                    marginTop: "8px",
                    fontSize: "medium",
                  }}
                >
                  About this page
                </div>
                <img
                  src={womanIcon}
                  width="45"
                  height="45"
                  className="d-inline-block align-top ml-2"
                  alt=""
                />
              </NavLink>
            </div>
          </nav>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default MenuBar;
