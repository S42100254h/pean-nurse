import React, { useEffect, useState } from "react";
import { Spacer } from "../components/UIkit";
import A_light from "../assets/img/A_light.png";
import B_light from "../assets/img/B_light.png";
import C_light from "../assets/img/C_light.png";
import D_light from "../assets/img/D_light.png";
import E_light from "../assets/img/E_light.png";
import F_light from "../assets/img/F_light.png";
import G_light from "../assets/img/G_light.png";
import H_light from "../assets/img/H_light.png";
import A_dark from "../assets/img/A_dark.png";
import B_dark from "../assets/img/B_dark.png";
import C_dark from "../assets/img/C_dark.png";
import D_dark from "../assets/img/D_dark.png";
import E_dark from "../assets/img/E_dark.png";
import F_dark from "../assets/img/F_dark.png";
import G_dark from "../assets/img/G_dark.png";
import H_dark from "../assets/img/H_dark.png";
import { Check } from "@material-ui/icons";
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

const Caption = styled.p`
  border-bottom: 1px solid #000;
  font-weight: bold;
`;

const SelectArea = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 85%;
  margin: 0 auto;
  padding: 50px 70px;
`;

const QuizContainer = styled.div``;

const QuizText = styled.p``;

const ChoiceContainer = styled.div`
  height: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const ChoiceText = styled.p``;

const Image = styled.img`
  height: 40px;
  width: 40px;
  float: left;
  margin: 0 20px 0 10px;
`;

const ChoicesContainer = styled.div``;

const AnswerContainer = styled.div``;

const CorrectAnserRate = styled.div`
  text-align: center;
`;

const checkAnswers = () => {};

type Choice = {
  id: number;
  choice: string;
  is_right: string;
  clicked: boolean;
};

const Study = () => {
  const [choices, setChoices] = useState<Choice[]>([]);

  const handleIsClicked = (index: number) => {
    const newChoices = [...choices];
    newChoices[index] = {
      ...newChoices[index],
      clicked: true,
    };
    setChoices(newChoices);
  };

  const icons = [
    A_light,
    B_light,
    C_light,
    D_light,
    E_light,
    F_light,
    G_light,
    H_light,
  ];

  useEffect(() => {
    setChoices([
      { id: 1, choice: "neko", is_right: "false", clicked: false },
      { id: 2, choice: "cat", is_right: "false", clicked: false },
      { id: 3, choice: "inu", is_right: "false", clicked: false },
      { id: 4, choice: "dog", is_right: "true", clicked: false },
    ]);
  }, []);

  console.log(choices);

  return (
    <Container>
      <Heading>神経内科Ⅰ</Heading>
      <SelectArea>
        <Caption>問題１</Caption>
        <Spacer size="xs" />
        <QuizContainer>
          <QuizText>
            クイズ本文クイズ本文クイズ本文クイズ本文クイズ本文 クイズ本文
            クイズ本文 クイズ本文 クイズ本文 クイズ本文 クイズ本文 クイズ本文
          </QuizText>
        </QuizContainer>
        <Spacer size="sm" />
        <ChoicesContainer>
          {choices.map((choice, index) => (
            <ChoiceContainer
              key={choice.id}
              onClick={() => handleIsClicked(index)}
            >
              <Image src={icons[index]} />
              <ChoiceText>{choice.choice}</ChoiceText>
            </ChoiceContainer>
          ))}
          <Spacer size="xs" />
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
