import React from "react";
import { Route, Switch } from "react-router";
import { Deactivate,DashBoard, Home, Setting, SignUp, SignIn } from "./templates";
import PrivateRoute from "./PrivateRoute";
import UnAuthRoute from "./UnAuthRoute";

const Router = () => {
  return (
    <Switch>
      <UnAuthRoute exact path={"(/)?"} component={Home} />
      <UnAuthRoute exact path={"/signup"} component={SignUp} />
      <UnAuthRoute exact path={"/signin"} component={SignIn} />
      <PrivateRoute exact path={"/dashboard"} component={DashBoard} />
      <PrivateRoute exact path={"/setting"} component={Setting} />
      <PrivateRoute exact path={"/deactivate"} component={Deactivate} />
    </Switch>
  );
};

export default Router;
