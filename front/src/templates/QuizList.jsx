import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { fetchQuizzes } from "../reducks/quizzes/operations";
import { getQuizzes } from "../reducks/quizzes/selectors";

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
  const selector = useSelector((state) => state);
  const quizzes = getQuizzes(selector);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>クイズ一覧</h2>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>{quiz.title}</div>
      ))}
    </div>
  ); 
};

export default QuizList;
