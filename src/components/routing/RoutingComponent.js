import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutMeContainer from "../aboutme/AboutMeContainer";
import AllBlogsContainer from "../blogs/blogList/AllBlogsContainer";
import LoginContainer from "../login/LoginContainer";
import GuardedRoute from "./GuardedRoute";
import CrupdateBlogContainer from "../blogs/edit-create/CrupdateBlogContainer";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import Logout from "../login/Logout";

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
              component={CrupdateBlogContainer}
              auth={isSignedIn}
            />
            <GuardedRoute
              path="/new"
              component={CrupdateBlogContainer}
              auth={isSignedIn}
            />
            <GuardedRoute path="/logout" component={Logout} auth={isSignedIn} />
            <Route component={AllBlogsContainer} />
          </Switch>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default RoutingComponent;
