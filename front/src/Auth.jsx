import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { push } from "connected-react-router";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = getSignedIn(selector);
  
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(push("/signin"));
    }
  }), [];

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
