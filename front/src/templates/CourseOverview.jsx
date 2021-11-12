import React from "react";
import { makeStyles } from "@material-ui/core";
import { CourseCard } from "../components/CourseCard";

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

const courseCards = [
  { id: 1, label: "神経内科Ⅰ"},
  { id: 2, label: "神経内科Ⅱ"},
  { id: 3, label: "神経内科Ⅲ"},
  { id: 4, label: "神経内科Ⅳ"},
];

const CourseOverview = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headline}>神経内科</div>
      <div className={classes.subHeadline}>ALS, パーキンソン病 ...</div>
      <div className="module-spacer--small" />
      {courseCards.map((card) => (
        <CourseCard key={card.id} label={card.label} />
      ))}
    </div>
  );
};

export default CourseOverview;
