import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/admins/selectors";
import { listenAdminState } from "./reducks/admins/operations";

const AdminRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAdminState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <Route { ...props } />;
  }
};

export default AdminRoute;
