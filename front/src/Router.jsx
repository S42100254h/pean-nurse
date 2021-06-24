import React from "react";
import { Route, Switch } from "react-router";
import { SignUp, SignIn, Home } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route path={"(/)?"} component={Home} />
    </Switch>
  );
};

export default Router;
