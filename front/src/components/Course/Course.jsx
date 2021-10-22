import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: 240,
    height: 280,
    backgroundColor: "#fff",
    boxShadow: "0 0 1px grey",
    textAlign: "center",
    transitionDuration: "0.3s",
    "&:hover": {
      transitionDuration: "0.5s",
      boxShadow: "0 0 8px grey",
      opacity: 0.75,
    },
  },
  title: {
    fontSize: 20,
    height: "auto",
    padding: "10px 0px",
  },
  image: {

  },
  caption: {
    padding: "10px 0px",
    fontSize: 12,
  },
  number: {
    padding: "10px 0px",
  },
});

const Course = (props) => {
  const classes = useStyles();

  return (
    <Box
      onClick={props.onClick}
      className={classes.container}
    >
      <div className={classes.title}>{props.title}</div>
      <img src={props.image} width="120px" height="120px" />
      <div className={classes.caption}>{props.caption}</div>
      <div>全{props.number}コース</div>
    </Box>
  );
};

export default Course;
