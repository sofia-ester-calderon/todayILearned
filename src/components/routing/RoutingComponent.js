import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutMeContainer from "../aboutme/AboutMeContainer";
import AllBlogsContainer from "../blogs/blogList/AllBlogsContainer";
import LoginContainer from "../login/LoginContainer";
import GuardedRoute from "./GuardedRoute";
import CreateBlogContainer from "../blogs/edit-create/CreateBlogContainer";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

const RoutingComponent = () => {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        return (
          <Switch>
            <Route path="/" exact component={AllBlogsContainer} />
            <Route path="/admin" component={LoginContainer} />
            <Route path="/aboutme" component={AboutMeContainer} />
            <GuardedRoute
              path="/edit/:id"
              component={CreateBlogContainer}
              auth={isSignedIn}
            />
            <GuardedRoute
              path="/new"
              component={CreateBlogContainer}
              auth={isSignedIn}
            />
            <Route component={AllBlogsContainer} />
          </Switch>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default RoutingComponent;
