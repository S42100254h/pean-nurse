import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/user/selectors";
import { getAdminSignedIn } from "./reducks/admin/selectors";
import { redirectToDashboard } from "./reducks/user/operations";
import { redirectToManagement } from "./reducks/admin/operations";
import { RootState } from "./types/entity/rootState";

const UnAuthRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const isSignedIn = getSignedIn(selector);
  const isAdminSignedIn = getAdminSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(redirectToDashboard());
    }
    if (!isAdminSignedIn) {
      dispatch(redirectToManagement());
    }
  }, []);

  if (!isSignedIn && !isAdminSignedIn) {
    return <Route {...props} />;
  } else {
    return <></>;
  }
};

export default UnAuthRoute;
