import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import { forgetPassword } from "../reducks/user/operations";
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
  color: ${props => props.theme.palette.primary.main};
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const TextContainer = styled.div`
  padding: 10px;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.primary.light};
`;

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(forgetPassword(email));
    }
  };

  return (
    <Container>
      <Heading>パスワードを忘れた場合</Heading>
      <Spacer size="xs" />
      <TextContainer>
        <p>ご登録いただいたメールアドレスを入力してください。</p>
        <p>パスワード変更ページのURLが記載されたメールを送信します。</p>
      </TextContainer>
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
      <Spacer size="sm" />
      <PrimaryButton
        id={"button"}
        label={"送信"}
        fullWidth={true}
        disabled={!email}
        onClick={() =>
          dispatch(forgetPassword(email))
        }
      />
    </Container>
  );
};

export default ForgetPassword;
