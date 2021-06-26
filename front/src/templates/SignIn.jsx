import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { signIn } from "../reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState(""),
    [ password, setPassword ] = useState("");
  
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} row={1} variant={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true} row={1} variant={"password"} onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        label={"サインイン"}
        onClick={() => {
          dispatch(signIn(email, password));
          dispatch(push("/"));
        }}
      />
    </div>
  );
};

export default SignIn;
