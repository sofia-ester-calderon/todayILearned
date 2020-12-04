import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutMeContainer from "../aboutme/AboutMeContainer";
import BlogListContainer from "../blogs/blogList/BlogListContainer";
import LoginContainer from "../login/LoginContainer";

const RoutingComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={BlogListContainer} />
      <Route path="/admin" component={LoginContainer} />
      <Route path="/aboutme" component={AboutMeContainer} />
      <Route component={BlogListContainer} />
    </Switch>
  );
};

export default RoutingComponent;
