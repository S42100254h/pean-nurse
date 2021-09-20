import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";
import { Redirect, Route, Switch } from "react-router";
import { Deactivate,DashBoard, Home, Setting, SignUp, SignIn } from "./templates";

const Router = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);
  
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);
  
  const PrivateRoute = ({ ...props }) => {
    if (isSignedIn) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/signin" />;
    }
  };
  
  const UnAuthRoute = ({ ...props }) => {
    if (isSignedIn) {
      return <Redirect to="/dashboard" />;
    } else {
      return <Route {...props} />;
    }
  };

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
