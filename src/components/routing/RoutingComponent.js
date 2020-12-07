import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutMeContainer from "../aboutme/AboutMeContainer";
import AllBlogsContainer from "../blogs/blogList/AllBlogsContainer";
import LoginContainer from "../login/LoginContainer";

const RoutingComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={AllBlogsContainer} />
      <Route path="/admin" component={LoginContainer} />
      <Route path="/aboutme" component={AboutMeContainer} />
      <Route component={AllBlogsContainer} />
    </Switch>
  );
};

export default RoutingComponent;
