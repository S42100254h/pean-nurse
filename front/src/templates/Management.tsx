import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  root: {
    marginTop: 30,
  },
  courseContainer: {
    width: "calc(100% - 5rem)",
    maxWidth: 1080,
    height: "auto",
    minHeight: 250,
    margin: " auto",
  },
  headline: {
    fontSize: 18,
  },
});

const Management = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <div className={classes.courseContainer}>
        <div className={classes.headline}>クイズ</div>
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"quizList"}
          label={"クイズ一覧"}
          onClick={() => dispatch(push("/quiz/list"))}
        />
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"createQuiz"}
          label={"クイズ作成"}
          onClick={() => dispatch(push("/quiz/create"))}
        />
      </div>
      <div className={classes.courseContainer}>
        <div className={classes.headline}>ユーザー</div>
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"userList"}
          label={"ユーザ一覧"}
          onClick={() => dispatch(push("/user/list"))}
        />
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"createUser"}
          label={"ユーザー作成"}
          onClick={() => dispatch(push("/user/create"))}
        />
      </div>
    </div>
  );
};

export default Management;
