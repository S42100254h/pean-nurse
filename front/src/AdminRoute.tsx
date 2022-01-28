import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSignedIn } from "./reducks/admin/selectors";
import { listenAdminState } from "./reducks/admin/operations";
import { RootState } from "./types/entity/rootState";

const AdminRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const isAdminSignedIn = getAdminSignedIn(selector);

  useEffect(() => {
    if (!isAdminSignedIn) {
      dispatch(listenAdminState());
    }
  }, []);

  if (!isAdminSignedIn) {
    return <></>;
  } else {
    return <Route {...props} />;
  }
};

export default AdminRoute;
