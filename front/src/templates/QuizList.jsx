import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { fetchQuizzes } from "../reducks/quizzes/operations";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>クイズ一覧</h2>
    </div>
  ); 
};

export default QuizList;
