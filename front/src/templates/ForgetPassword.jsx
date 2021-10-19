import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { forgetPassword } from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 auto",
    maxWidth: 400,
    padding: "1rem",
    height: "auto",
    width: "calc(100% - 2rem)",
  },
  headline: {
    color: theme.palette.primary.main,
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  textContainer: {
    padding: "10px",
    border: "1px solid #b0c4de",
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.light,
  },
}));

const ForgetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      dispatch(forgetPassword(email));
    }
  };

  return (
    <div className={classes.container} >
      <h2 className={classes.headline}>パスワードを忘れた場合</h2>
      <div className="module-spacer--extra-small" />
      <div className={classes.textContainer}>
        <p>ご登録いただいたメールアドレスを入力してください。</p>
        <p>パスワード変更ページのURLが記載されたメールを送信します。</p>
      </div>
      <div className="module-spacer--extra-small" />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        row={1}
        value={email}
        onChange={inputEmail}
        onKeyDown={handleOnKeyDown}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        id={"button"}
        label={"送信"}
        fullWidth={true}
        disabled={!email}
        onClick={() =>
          dispatch(forgetPassword(email))
        }
      />
    </div>
  );
};

export default ForgetPassword;
