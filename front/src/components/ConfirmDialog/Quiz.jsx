import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  textContainer: {
    width: 700,
    padding: 10,
    marginBottom: 15,
    boxShadow: "0 0 1px grey",
    borderRadius: "4px",
  },
  caption: {
    fontWeight: "bold",
  },
});

const Quiz = (props) => {
  const classes = useStyles();
  
  return (
    <>
      <div className={classes.textContainer}>
        <p className={classes.caption}>{props.label}</p>
        <div>{props.quiz}</div>
      </div>
    </>
  );
};

export default Quiz;
