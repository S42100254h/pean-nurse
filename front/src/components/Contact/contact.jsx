import React from "react";
import { makeStyles } from "@material-ui/core";
import { Email } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: "0",
    right: "0",
  },
  main: {
    padding: "5px 15px",
    backgroundColor: "#F08080",
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Email />      
      <p className={classes.main}>ご意見箱</p>
    </div>
  );
};

export default Contact;
