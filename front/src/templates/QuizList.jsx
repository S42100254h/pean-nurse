import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
});

const QuizList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>クイズ一覧</h2>
    </div>
  ); 
};

export default QuizList;
