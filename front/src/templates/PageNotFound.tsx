import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { push } from "connected-react-router";
import { getSignedIn } from "../reducks/users/selectors";
import { RootState } from "../types/entity/rootState";

const useStyles = makeStyles({
  "container": {
    width: 500,
    margin: "40px auto",
  },
  "heading": {
    fontSize: 48,
  },
  "text": {
    fontSize: 28,
  },
  "subText": {
    fontSize: 22,
  },
  "home": {
    fontSize: 22,
    borderBottom: "1px solid",
    display: "inline-block",
    cursor: "pointer",
  },
});

const PageNotFound = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getSignedIn(selector);

  const handlePush = () => {
    if (isSignedIn) {
      dispatch(push("/dashboard"));
    } else {
      dispatch(push("/"));
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>404</h1>
      <p className={classes.text}>Page Not Found</p>
      <p className={classes.subText}>指定されたページが存在しません。</p>
      <div className="module-spacer--extra-extra-small" />
      <p className={classes.home} onClick={() => handlePush()} >ホームへ戻る</p>
    </div>
  );
};

export default PageNotFound;
