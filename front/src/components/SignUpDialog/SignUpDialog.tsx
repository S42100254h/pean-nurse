import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { PasswordInput, PrimaryButton, TextInput } from "../UIkit";
import { signUp } from "../../reducks/user/operations";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  container: {
    margin: "10px auto",
    maxWidth: 600,
    padding: "35px 70px",
    height: "auto",
    width: "calc(100% - 2rem)",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  link: {
    textAlign: "center",
    color: "#4dd0e1",
    "&:hover": {
      textDecoration: "underline #4dd0e1",
      cursor: "pointer",
    }
  },
});

type Props = {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
};

const SignUpDialog = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ name, setName ] = useState(""),
    [ email, setEmail] = useState(""),
    [ password, setPassword ] = useState(""),
    [ confirmPassword, setConfirmPassword ] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, [setConfirmPassword]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(signUp(name, email, password, confirmPassword));
      props.onClick();
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <div className={classes.container}>
            <h2 className={classes.headline}>アカウント登録</h2>
            <div className="module-spacer--extra-small" />
            <TextInput
              fullWidth={true}
              label={"ユーザー名"}
              multiline={false}
              required={true}
              rows={1}
              value={name}
              type={"text"}
              onChange={inputName}
              onKeyDown={handleOnKeyDown}
            />
            <div className="module-spacer--extra-extra-small" />
            <TextInput
              fullWidth={true}
              label={"メールアドレス"}
              multiline={false}
              required={true}
              rows={1}
              value={email}
              type={"email"}
              onChange={inputEmail}
              onKeyDown={handleOnKeyDown}
            />
            <div className="module-spacer--extra-extra-small" />
            <PasswordInput
              fullWidth={true}
              label={"パスワード"}
              multiline={false}
              required={true}
              rows={1}
              value={password}
              onChange={inputPassword}
              onKeyDown={handleOnKeyDown}
            />
            <div className="module-spacer--extra-extra-small" />
            <PasswordInput
              fullWidth={true}
              label={"パスワード（確認用）"}
              multiline={false}
              required={true}
              rows={1}
              value={confirmPassword}
              onChange={inputConfirmPassword}
              onKeyDown={handleOnKeyDown}
            />
            <div className="module-spacer--medium" />
            <PrimaryButton
              label={"アカウントを登録する"}
              fullWidth={true}
              disabled={!name || !email || !password || !confirmPassword}
              onClick={() => {
                dispatch(signUp(name, email, password, confirmPassword));
                props.onClick();
              }}
            />
            <div className="module-spacer--extra-small" />
            <p
              className={classes.link}
              onClick={() => {
                dispatch(push("/signin"));
                props.onClick();
              }}>
                アカウントをお持ちの方はこちら
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;
