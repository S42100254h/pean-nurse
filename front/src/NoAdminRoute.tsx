import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSignedIn } from "./reducks/admin/selectors";
import { redirectToManagement } from "./reducks/admin/operations";
import { RootState } from "./types/entity/rootState";

const NoAdminRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  
  const isAdminSignedIn = getAdminSignedIn(selector);
  
  useEffect(() => {
    if (!isAdminSignedIn) {
      dispatch(redirectToManagement());
    }
  }, []);
  
  if (!isAdminSignedIn) {
    return <Route { ...props } />;
  } else {
    return <></>;
  }
};

export default NoAdminRoute;
