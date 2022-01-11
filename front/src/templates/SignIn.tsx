import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PasswordInput, PrimaryButton, Spacer } from "../components/UIkit";
import { signIn } from "../reducks/user/operations";
import { push } from "connected-react-router";
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

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(signIn(email, password));
    }
  };

  return (
    <Container>
      <Heading>サインイン</Heading>
      <Spacer size="xs" />
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
      <Spacer size="xxs" />
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
      <Spacer size="sm" />
      <PrimaryButton
        id={"button"}
        label={"サインイン"}
        fullWidth={true}
        disabled={!email || !password}
        onClick={() => {
          dispatch(signIn(email, password));
        }}
      />
      <Spacer size="xs" />
      <TextWrapper>
        パスワードを忘れた場合は
        <Link
          onClick={() => dispatch(push("/forgetpassword"))}
        >
          こちら
        </Link>
      </TextWrapper>
    </Container>
  );
};

export default SignIn;
