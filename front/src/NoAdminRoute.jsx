import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/admins/selectors";
import { redirectToManagement } from "./reducks/admins/operations";

const NoAdminRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  
  const isSignedIn = getSignedIn(selector);
  
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(redirectToManagement());
    }
  }, []);
  
  if (!isSignedIn) {
    return <Route { ...props } />;
  } else {
    return <></>;
  }
};

export default NoAdminRoute;
