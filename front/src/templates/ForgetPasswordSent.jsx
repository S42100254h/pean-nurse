import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: "0 auto",
    maxWidth: 400,
    padding: "1rem",
    height: "auto",
    width: "calc(100% - 2rem)",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  textContainer: {
    padding: "10px",
    border: "1px solid #b0c4de",
    borderRadius: "4px",
    backgroundColor: "#f0f8ff",
  },
});

const ForgetPasswordSent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>メール送信完了</h2>
      <div className="module-spacer--extra-small" />
      <div className={classes.textContainer}>
        <p>パスワード再設定用のURLを送信しました。</p>
        <p>記載された内容に従って、パスワードの再設定を行ってください。</p>
      </div>
    </div>
  );
};

export default ForgetPasswordSent;