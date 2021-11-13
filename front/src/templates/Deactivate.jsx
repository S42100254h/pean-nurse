import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { SecondaryButton, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { deleteUser } from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  "span": {
    color: "#cf222e",
    fontWeight: "bold",
  },
  "container": {
    padding: "10px",
    border: "1px solid #b0c4de",
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.light,
  },
}));

const Deactivate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const inputText = useCallback((event) => {
    setText(event.target.value);
  }, [setText]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">退会手続き（最終確認）</h2>
      <div className="module-spacer--extra-small" />
      <div className={classes.container}>
        <h2>退会手続きの前にご確認ください</h2>
        <div className="module-spacer--extra-extra-small" />
        <p>アカウントを削除すると、これまでのデータが<span className={classes.span}>すべて削除されます</span></p>
      </div>
      <div className="module-spacer--extra-extra-small" />
      <p>よろしければ、退会理由を教えてください。（任意：255文字以内）</p>
      <TextInput
        fullWidth={true}
        label={"退会理由"}
        multiline={true}
        rows={6}
        value={text}
        variant="outlined"
        onChange={inputText}
      />
      <div className="module-spacer--extra-small" />
      <SecondaryButton
        label={"退会する"}
        fullWidth={true}
        onClick={() => dispatch(deleteUser())}
      />
    </div>
  );
};

export default Deactivate;
