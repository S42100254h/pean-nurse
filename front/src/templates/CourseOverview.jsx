import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: 1080,
    padding: "35px 70px",
    height: "auto",
    width: "calc(100% - 2rem)",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px grey",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  subHeadline: {
    fontSize: "1rem",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
  link: {
    color: "#4dd0e1",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    }
  },
});

const CourseOverview = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headline}>神経内科</div>
      <div className={classes.subHeadline}>ALS, パーキンソン病 ...</div>
      <div>神経内科Ⅰ</div>
      <div>神経内科Ⅱ</div>
      <div>神経内科Ⅲ</div>
    </div>
  );
};

export default CourseOverview;
