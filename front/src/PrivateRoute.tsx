import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/user/selectors";
import { listenAuthState } from "./reducks/user/operations";
import { RootState } from "./types/entity/rootState";

const PrivateRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
