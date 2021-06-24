import React, { useCallback, useState} from "react";
import { TextField } from "@material-ui/core";

const SignUp = () => {

  const [ username, setUsername ] = useState(""),
        [ email, setEmail] = useState(""),
        [ password, setPassword ] = useState(""),
        [ confirmPassword, setConfirmPassword ] = useState("");
};

const inputUsername = useCallback((event) => {
  setUsername(event.target.value)
}, [setUsername]);

const inputEmail = useCallback((event) => {
  setEmail(event.target.value)
}, [setEmail]);

const inputPassword = useCallback((event) => {
  setPassword(event.target.value)
}, [setPassword]);

const inputConfirmPassword = useCallback((event) => {
  setConfirmPassword(event.target.value)
}, [setConfirmPassword]);

return (
  <div>
    <h2>アカウント登録</h2>
    <TextField
      fullWidth={true} label={"ユーザー名"} multiline={false} required={true} row={1} value={username} type={"text"} onChange={inputUsername}
    />
    <TextField
      fullWidth={true} label={"メールアドレス"} multiline={false} required={true} row={1} value={email} type={"email"} onChange={inputEmail}
    />
    <TextField
      fullWidth={true} label={"パスワード"} multiline={false} required={true} row={1} value={password} type={"password"} onChange={inputPassword}
    />
    <TextField
      fullWidth={true} label={"パスワード（確認用）"} multiline={false} required={true} row={1} value={confirmPassword} type={"confirmPassword"} onChange={inputConfirmPassword}
    />
  </div>
);

export default SignUp;
