import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PasswordInput, PrimaryButton, Spacer } from "../components/UIkit";
import { resetPassword } from "../reducks/user/operations";
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

const TextContainer = styled.div`
  padding: 10px;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  background-color: #f0f8ff;
`;

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState(""),
    [password_confirmation, setPasswordConfirmation] = useState("");

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword],
  );

  const inputPasswordConfirmation = useCallback(
    (event) => {
      setPasswordConfirmation(event.target.value);
    },
    [setPasswordConfirmation],
  );

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(resetPassword(password, password_confirmation));
    }
  };

  return (
    <Container>
      <Heading>パスワード再設定</Heading>
      <Spacer size="xs" />
      <TextContainer>
        <p>新しいパスワードを入力してください。</p>
      </TextContainer>
      <Spacer size="xs" />
      <PasswordInput
        fullWidth={true}
        label={"パスワード（６文字以上）"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        onChange={inputPassword}
      />
      <PasswordInput
        fullWidth={true}
        label={"確認用パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password_confirmation}
        onChange={inputPasswordConfirmation}
        onKeyDown={handleOnKeyDown}
      />
      <Spacer size="xs" />
      <PrimaryButton
        label={"パスワード再設定"}
        fullWidth={true}
        disabled={!password || !password_confirmation}
        onClick={() => {
          dispatch(resetPassword(password, password_confirmation));
        }}
      />
    </Container>
  );
};

export default ResetPassword;
