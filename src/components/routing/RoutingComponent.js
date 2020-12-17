import React from "react";
import { Route, Switch } from "react-router-dom";
import { useUserContext } from "../../hooks/UserState";
import AboutMeContainer from "../aboutme/AboutMeContainer";
import AllBlogsContainer from "../blogs/blogList/AllBlogsContainer";
import LoginContainer from "../login/LoginContainer";
import GuardedRoute from "./GuardedRoute";
import CreateBlogContainer from "../blogs/edit-create/CreateBlogContainer";

const RoutingComponent = () => {
  const adminContext = useUserContext();

  return (
    <Switch>
      <Route path="/" exact component={AllBlogsContainer} />
      <Route path="/admin" component={LoginContainer} />
      <Route path="/aboutme" component={AboutMeContainer} />
      <GuardedRoute
        path="/edit/:id"
        component={CreateBlogContainer}
        auth={adminContext.user.adminMode}
      />
      <GuardedRoute
        path="/new"
        component={CreateBlogContainer}
        auth={adminContext.user.adminMode}
      />
      <Route component={AllBlogsContainer} />
    </Switch>
  );
};

export default RoutingComponent;
