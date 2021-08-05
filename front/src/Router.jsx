import React from "react";
import { Route, Switch } from "react-router";
import { DashBoard, Home, Setting, SignUp, SignIn } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/dashboard"} component={DashBoard} />
        <Route exact path={"/setting"} component={Setting} />
      </Auth>
    </Switch>
  );
};

export default Router;
