import React, { useCallback, useState} from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";

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
    border: "1px solid #cf222e",
    borderRadius: "4px",
    backgroundColor: "#FFEEFF",
  },
});

const ForgetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

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
        onClick={() => console.log("test")}
      />
    </div>
  );
};

export default ForgetPassword;
