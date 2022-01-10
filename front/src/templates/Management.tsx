import React from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import styled from "styled-components";

const Root = styled.div`
  margin-top: 30px;
`;

const Container = styled.div`
  width: calc(100% - 5rem);
  max-width: 1080px;
  height: auto;
  min-height: 250px;
  margin: auto;
`;

const Heading = styled.h2`
  font-size: 18px;
`;

const Management = () => {
  const dispatch = useDispatch();

  return (
    <Root>
      <Container>
        <Heading>クイズ</Heading>
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"quizList"}
          label={"クイズ一覧"}
          onClick={() => dispatch(push("/quiz/list"))}
        />
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"createQuiz"}
          label={"クイズ作成"}
          onClick={() => dispatch(push("/quiz/create"))}
        />
      </Container>
      <Container>
        <Heading>ユーザー</Heading>
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"userList"}
          label={"ユーザ一覧"}
          onClick={() => dispatch(push("/user/list"))}
        />
        <div className="module-spacer--extra-small" />
        <PrimaryButton
          id={"createUser"}
          label={"ユーザー作成"}
          onClick={() => dispatch(push("/user/create"))}
        />
      </Container>
    </Root>
  );
};

export default Management;
