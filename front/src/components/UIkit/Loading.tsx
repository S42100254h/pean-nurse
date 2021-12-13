import React, { ReactNode } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getLoadingState, getLoadingText } from "../../reducks/loading/selectors";
import { RootState } from "../../types/entity/rootState";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    background: "white",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    zIndex: 10,
  },
});

type Props = {
  children: ReactNode;
};

const Loading = ({ children } :Props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const isBeingLoaded = getLoadingState(selector);
  const loadingText = getLoadingText(selector);

  return (
    <>
      {isBeingLoaded && (
        <section className={classes.root}>
          <CircularProgress />
          <p>{loadingText}</p>
        </section>
      )}
      {children}
    </>
  );
};

export default Loading;
