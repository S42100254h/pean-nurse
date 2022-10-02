import React from "react";
import { Route, Switch, withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  AdminSignIn,
  CategoryDetail,
  CategoryList,
  CourseOverview,
  CourseList,
  CreateCategory,
  CreateExperience,
  CreateQuiz,
  Deactivate,
  DashBoard,
  ExperienceList,
  ForgetPassword,
  ForgetPasswordSent,
  Help,
  Home,
  Management,
  PageNotFound,
  QuizDetail,
  QuizList,
  ResetPassword,
  Setting,
  SignUp,
  SignIn,
  Study,
  UserDetail,
  UserList,
} from "./templates";
import AdminRoute from "./AdminRoute";
import NoAdminRoute from "./NoAdminRoute";
import PrivateRoute from "./PrivateRoute";
import UnAuthRoute from "./UnAuthRoute";

const Router = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="item" timeout={1000} exit={false}>
      <Switch>
        <AdminRoute exact path={"/category/create"} component={CreateCategory} />
        <AdminRoute exact path={"/category/detail/:id"} component={CategoryDetail} />
        <AdminRoute exact path={"/category/list"} component={CategoryList} />
        <AdminRoute exact path={"/experience/list"} component={ExperienceList} />
        <AdminRoute exact path={"/experience/create"} component={CreateExperience} />
        <AdminRoute exact path={"/management"} component={Management} />
        <AdminRoute exact path={"/quiz/create"} component={CreateQuiz} />
        <AdminRoute exact path={"/quiz/detail/:id"} component={QuizDetail} />
        <AdminRoute exact path={"/quiz/list"} component={QuizList} />
        <AdminRoute exact path={"/user/list"} component={UserList} />
        <AdminRoute exact path={"/user/detail/:id"} component={UserDetail} />
        <NoAdminRoute exact path={"/adminsignin"} component={AdminSignIn} />
        <UnAuthRoute exact path={"(/)?"} component={Home} />
        <UnAuthRoute exact path={"/forgetpassword"} component={ForgetPassword} />
        <UnAuthRoute exact path={"/forgetpassword/sent"} component={ForgetPasswordSent} />
        <UnAuthRoute exact path={"/resetpassword"} component={ResetPassword} />
        <UnAuthRoute exact path={"/signup"} component={SignUp} />
        <UnAuthRoute exact path={"/signin"} component={SignIn} />
        <PrivateRoute exact path={"/courselist"} component={CourseList} />
        <PrivateRoute exact path={"/courselist/:id"} component={CourseOverview} />
        <PrivateRoute exact path={"/dashboard"} component={DashBoard} />
        <PrivateRoute exact path={"/setting"} component={Setting} />
        <PrivateRoute exact path={"/courselist/:id/study/:id"} component={Study} />
        <PrivateRoute exact path={"/deactivate"} component={Deactivate} />
        <PrivateRoute exact path={"/help"} component={Help} />
        <Route component={PageNotFound} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default Router;
