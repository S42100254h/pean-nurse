import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { PasswordInput, PrimaryButton, Spacer, TextInput } from "../UIkit";
import { signUp } from "../../reducks/user/operations";
import { push } from "connected-react-router";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px auto;
  max-width: 600px;
  padding: 35px 70px;
  height: auto;
  width: calc(100% - 2rem);
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
  }
`;

type Props = {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
};

const SignUpDialog = (props: Props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName],
  );

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail],
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword],
  );

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword],
  );

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      dispatch(signUp(name, email, password, confirmPassword));
      props.onClick();
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={() => props.onClose()} fullWidth={true} maxWidth={"sm"}>
        <DialogContent>
          <Container>
            <Heading>アカウント登録</Heading>
            <Spacer size="xs" />
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
            <Spacer size="xxs" />
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
            <Spacer size="xxs" />
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
            <Spacer size="sm" />
            <PrimaryButton
              label={"アカウントを登録する"}
              fullWidth={true}
              disabled={!name || !email || !password || !confirmPassword}
              onClick={() => {
                dispatch(signUp(name, email, password, confirmPassword));
                props.onClick();
              }}
            />
            <Spacer size="xs" />
            <TextWrapper>
              アカウントをお持ちの場合は
              <Link
                onClick={() => {
                  dispatch(push("/signin"));
                  props.onClick();
                }}
              >
                こちら
              </Link>
            </TextWrapper>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpDialog;
