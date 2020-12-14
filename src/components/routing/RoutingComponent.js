import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAdminContext } from "../../hooks/AdminState";
import AboutMeContainer from "../aboutme/AboutMeContainer";
import AllBlogsContainer from "../blogs/blogList/AllBlogsContainer";
import EditBlogContainer from "../blogs/edit-create/EditBlogContainer";
import LoginContainer from "../login/LoginContainer";
import GuardedRoute from "./GuardedRoute";
import CreateBlogContainer from "../blogs/edit-create/CreateBlogContainer";

const RoutingComponent = () => {
  const adminContext = useAdminContext();

  return (
    <Switch>
      <Route path="/" exact component={AllBlogsContainer} />
      <Route path="/admin" component={LoginContainer} />
      <Route path="/aboutme" component={AboutMeContainer} />
      <GuardedRoute
        path="/edit/:id"
        component={EditBlogContainer}
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
