import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PasswordInput, PrimaryButton } from "../components/UIkit";
import { adminSignIn } from "../reducks/admin/operations";
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

const AdminSignIn = () => {
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
      dispatch(adminSignIn(email, password));
    }
  };
  return (
    <Container>
      <Heading>管理者サインイン</Heading>
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
          dispatch(adminSignIn(email, password));
        }}
      />
    </Container>
  );
};

export default AdminSignIn;
