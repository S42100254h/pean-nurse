import React, { useCallback, useState } from "react";
import { SecondaryButton, Spacer, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { deleteUser } from "../reducks/user/operations";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 1rem;
  height: auto;
  width: calc(100% - 2rem);
`;

const TextContainer = styled.div`
  padding: 10px;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.primary.light};
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const Red = styled.span`
  color: #cf222e;
  font-weight: bold;
`;

const Deactivate = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const inputText = useCallback(
    (event) => {
      setText(event.target.value);
    },
    [setText]
  );

  return (
    <Container>
      <Heading>退会手続き（最終確認）</Heading>
      <Spacer size="xs" />
      <TextContainer>
        <h2>退会手続きの前にご確認ください</h2>
        <Spacer size="xxs" />
        <p>
          アカウントを削除すると、これまでのデータが
          <Red>すべて削除されます</Red>
        </p>
      </TextContainer>
      <Spacer size="xxs" />
      <p>よろしければ、退会理由を教えてください。（任意：255文字以内）</p>
      <TextInput
        fullWidth={true}
        label={"退会理由"}
        multiline={true}
        rows={6}
        value={text}
        variant="outlined"
        onChange={inputText}
      />
      <Spacer size="xs" />
      <SecondaryButton
        label={"退会する"}
        fullWidth={true}
        onClick={() => dispatch(deleteUser())}
      />
    </Container>
  );
};

export default Deactivate;
