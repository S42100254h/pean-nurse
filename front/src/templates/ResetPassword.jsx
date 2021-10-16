import React, { useCallback, useState }  from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { PasswordInput, PrimaryButton } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";

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

const ResetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [password, setPassword] = useState(""),
    [password_confirmation, setPasswordConfirmation] = useState("");

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const inputPasswordConfirmation = useCallback((event) => {
    setPasswordConfirmation(event.target.value);
  }, [setPasswordConfirmation]);
  
  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      dispatch(resetPassword(password, password_confirmation));
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>パスワード再設定</h2>
      <div className="module-spacer--extra-small" />
      <div className={classes.textContainer}>
        <p>新しいパスワードを入力してください。</p>
      </div>
      <div className="module-spacer--extra-small" />
      <PasswordInput
        fullWidth={true}
        label={"パスワード（６文字以上）"}
        multiline={false}
        required={true}
        row={1}
        value={password}
        onChange={inputPassword}
      />
      <PasswordInput
        fullWidth={true}
        label={"確認用パスワード"}
        multiline={false}
        required={true}
        row={1}
        value={password_confirmation}
        onChange={inputPasswordConfirmation}
        onKeyDown={handleOnKeyDown}
      />
      <div className="module-spacer--extra-small" />
      <PrimaryButton
        label={"パスワード再設定"}
        fullWidth={true}
        disabled={!password || !password_confirmation}
        onClick={() => {
          dispatch(resetPassword(password, password_confirmation));
        }}
      />
    </div>
  );
};

export default ResetPassword;
