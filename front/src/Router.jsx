import React from "react";
import { Route, Switch } from "react-router";
import { SignUp, SignIn, Home, DashBoard } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/dashboard"} component={DashBoard} />
      </Auth>
    </Switch>
  );
};

export default Router;
