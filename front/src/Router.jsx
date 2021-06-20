import React from "react";
import { Route, Switch } from "react-router";
import { SignIn, Home } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="(/)?" component={Home} />
    </Switch>
  );
};

export default Router;
