import React, { useCallback, useState} from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signUp } from "../reducks/users/operations";

const SignUp = () => {
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

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      dispatch(signUp(name, email, password, confirmPassword));
    }
  };

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true} row={1} value={name} type={"text"} onChange={inputName} onKeyDown={handleOnKeyDown}
      />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true} row={1} value={email} type={"email"} onChange={inputEmail} onKeyDown={handleOnKeyDown}
      />
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true} row={1} value={password} type={"password"} onChange={inputPassword} onKeyDown={handleOnKeyDown}
      />
      <TextInput
        fullWidth={true} label={"パスワード（確認用）"} multiline={false} required={true} row={1} value={confirmPassword} type={"confirmPassword"} onChange={inputConfirmPassword} onKeyDown={handleOnKeyDown}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        label={"アカウントを登録する"}
        onClick={() => {
          dispatch(signUp(name, email, password, confirmPassword));
        }}
      />
      <p onClick={() => dispatch(push("/signin"))}>アカウントをお持ちの方はこちら</p>
    </div>
  );
};

export default SignUp;
