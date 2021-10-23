import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    height: 300,
    backgroundColor: theme.palette.basic.main,
    
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      footer
    </div>
  );
};

export default Footer;
