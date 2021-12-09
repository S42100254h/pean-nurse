import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { getAdminSignedIn } from "./reducks/admins/selectors";
import { redirectToDashboard } from "./reducks/users/operations";
import { redirectToManagement } from "./reducks/admins/operations";
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
    return <Route { ...props } />;
  } else {
    return <></>;
  }
};

export default UnAuthRoute;
