import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { redirectToDashboard } from "./reducks/users/operations";

const UnAuthRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(redirectToDashboard());
    }
  }, []);
  
  if (!isSignedIn) {
    return <Route { ...props } />;
  } else {
    return <></>;
  }
};

export default UnAuthRoute;
