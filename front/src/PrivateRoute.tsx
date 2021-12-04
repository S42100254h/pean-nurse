import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";

const PrivateRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return  <Route { ...props } />; 
  }
};

export default PrivateRoute;
