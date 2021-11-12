import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: 700,
    padding: 10,
    marginBottom: 15,
    boxShadow: "0 0 1px grey",
    borderRadius: "4px",
  },
});

const CourseCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{props.label}</div>
    </div>
  );
};

export default CourseCard;
