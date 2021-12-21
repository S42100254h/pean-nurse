import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { TextInput, PasswordInput, PrimaryButton } from "../components/UIkit";
import { signIn } from "../reducks/user/operations";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: 600,
    padding: "35px 70px",
    height: "auto",
    width: "calc(100% - 2rem)",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px grey",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
  link: {
    color: "#4dd0e1",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    }
  },
});

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState(""),
    [ password, setPassword ] = useState("");
  
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(signIn(email, password));
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>サインイン</h2>
      <div className="module-spacer--extra-small" />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
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
      <div className="module-spacer--medium" />
      <PrimaryButton
        id={"button"}
        label={"サインイン"}
        fullWidth={true}
        disabled={!email || !password}
        onClick={() => {
          dispatch(signIn(email, password));
        }}
      />
      <div className="module-spacer--extra-small" />
      <div className={classes.text}>
        パスワードを忘れた場合は
        <span
          className={classes.link}
          onClick={() => dispatch(push("/forgetpassword"))}
        >
          こちら
        </span>
      </div>
    </div>
  );
};

export default SignIn;
