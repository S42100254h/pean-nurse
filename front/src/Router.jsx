import React from "react";
import { Route, Switch, withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  AdminSignIn,
  CourseList,
  Deactivate,
  DashBoard,
  ForgetPassword,
  ForgetPasswordSent,
  Home,
  Management,
  PageNotFound,
  ResetPassword,
  Setting,
  SignUp,
  SignIn
} from "./templates";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UnAuthRoute from "./UnAuthRoute";

const Router = withRouter(({ location }) => 
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="item" timeout={1000} exit={false} >
      <Switch>
        <AdminRoute exact path={"/management"} component={Management} />
        <UnAuthRoute exact path={"(/)?"} component={Home} />
        <UnAuthRoute exact path={"/adminsignin"} component={AdminSignIn} />
        <UnAuthRoute exact path={"/forgetpassword"} component={ForgetPassword} />
        <UnAuthRoute exact path={"/forgetpassword/sent"} component={ForgetPasswordSent} />
        <UnAuthRoute exact path={"/resetpassword"} component={ResetPassword} />
        <UnAuthRoute exact path={"/signup"} component={SignUp} />
        <UnAuthRoute exact path={"/signin"} component={SignIn} />
        <PrivateRoute exact path={"/courselist"} component={CourseList} />
        <PrivateRoute exact path={"/dashboard"} component={DashBoard} />
        <PrivateRoute exact path={"/setting"} component={Setting} />
        <PrivateRoute exact path={"/deactivate"} component={Deactivate} />
        <Route component={PageNotFound} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

export default Router;
