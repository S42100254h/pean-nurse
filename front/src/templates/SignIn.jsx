import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
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

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      dispatch(signIn(email, password));
    }
  };

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
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
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        type="password"
        multiline={false}
        required={true}
        row={1}
        value={password}
        onChange={inputPassword}
        onKeyDown={handleOnKeyDown}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        id={"button"}
        label={"サインイン"}
        onClick={() => {
          dispatch(signIn(email, password));
        }}
      />
    </div>
  );
};

export default SignIn;
