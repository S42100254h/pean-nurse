import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signIn } from "../reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>サインイン</h2>
      <button onClick={() => {
        dispatch(signIn("wanko@gmail.com", "a8810097"));
        dispatch(push("/"));
      }}>
        サインイン
      </button>
    </div>
  );
};

export default SignIn;
