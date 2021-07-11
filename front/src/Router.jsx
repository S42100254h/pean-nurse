import React from "react";
import { Route, Switch } from "react-router";
import { SignUp, SignIn, Home } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;
