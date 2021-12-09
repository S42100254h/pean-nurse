import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    boxShadow: "0 0 1px grey",
    borderRadius: "4px",
    transitionDuration: "0.3s",
    "&:hover": {
      transitionDuration: "0.5s",
      boxShadow: "0 0 8px grey",
      opacity: 0.75,
      cursor: "pointer",
    },
  },
  label: {
    fontSize: 18,
  },
});

type Props = {
  key: number;
  label: string;
};

const CourseCard = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.label}>{props.label}</div>
    </div>
  );
};

export default CourseCard;
