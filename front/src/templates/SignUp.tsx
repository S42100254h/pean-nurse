import React, { useCallback, useState} from "react";
import { TextInput, PasswordInput, PrimaryButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signUp } from "../reducks/user/operations";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px auto;
  max-width: 600px;
  padding: 35px 70px;
  height: auto;
  width: calc(100% - 2rem);
  background-color: #fff;
  box-shadow: 0 0 1px grey;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const Link = styled.span`
  color: #4dd0e1;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  };
`;

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

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(signUp(name, email, password, confirmPassword));
    }
  };

  return (
    <Container>
      <Heading>アカウント登録</Heading>
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
        }}
      />
      <div className="module-spacer--small" />
      <TextWrapper>
        アカウントをお持ちの場合は
        <Link
          onClick={() => dispatch(push("/signin"))}
        >
          こちら
        </Link>
      </TextWrapper>
    </Container>
  );
};

export default SignUp;
