import React from "react";
import { Spacer } from "../components/UIkit";
import styled from "styled-components";

const Container = styled.div`
  margin: 25px auto;
  width: calc(100% - 10rem);
  max-width: 1080px;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const SelectArea = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 85%;
  margin: 0 auto;
  padding: 30px 50px;
`;

const QuizContainer = styled.div``;

const QuizText = styled.p``;

const ChoiceText = styled.p``;

const ChoicesContainer = styled.div``;

const AnswerContainer = styled.div``;

const CorrectAnserRate = styled.div`
  text-align: center;
`;

const Study = () => {
  return (
    <Container>
      <Heading>神経内科Ⅰ</Heading>
      <SelectArea>
        <p>問題１</p>
        <QuizContainer>
          <QuizText>
            クイズ本文クイズ本文クイズ本文クイズ本文クイズ本文 クイズ本文
            クイズ本文 クイズ本文 クイズ本文 クイズ本文 クイズ本文 クイズ本文
          </QuizText>
        </QuizContainer>
        <Spacer size="sm" />
        <ChoicesContainer>
          <ChoiceText>選択肢１</ChoiceText>
          <Spacer size="xs" />
          <ChoiceText>選択肢２</ChoiceText>
          <Spacer size="xs" />
          <ChoiceText>選択肢３</ChoiceText>
          <Spacer size="xs" />
          <ChoiceText>選択肢４</ChoiceText>
        </ChoicesContainer>
        <Spacer size="sm" />
        <AnswerContainer>選択肢１</AnswerContainer>
        <Spacer size="sm" />
        <CorrectAnserRate>
          <p>現在のあなたの成績は7/7問正解！！</p>
          <p>正答率 100%！！</p>
        </CorrectAnserRate>
      </SelectArea>
    </Container>
  );
};

export default Study;
