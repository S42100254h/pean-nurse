import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
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
import arrowLeft from "../assets/img/arrowLeft.png";
import arrowRight from "../assets/img/arrowRight.png";
import { Cancel, CheckCircle } from "@material-ui/icons";
import styled from "styled-components";
import axios from "axios";

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
  padding: 50px 70px 80px 70px;
`;

const QuizContainer = styled.div`
  padding-top: 10px;
`;

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

const Image = styled.img`
  height: 40px;
  width: 40px;
  float: left;
  margin: 0 20px 0 10px;
  padding: 3px;
  box-sizing: border-box;
`;

const StyledCheckCircle = styled(CheckCircle)`
  height: 40px;
  width: 40px;
  float: left;
  margin: 0 20px 0 10px;
  color: #43a047;
`;

const StyledCancel = styled(Cancel)`
  height: 40px;
  width: 40px;
  float: left;
  margin: 0 20px 0 10px;
  color: #d32f2f;
`;

const StyledArrowLeft = styled.img`
  height: 40px;
  width: 80px;
  float: left;
  margin-left: 70px;
  cursor: pointer;
`;

const StyledArrowRight = styled.img`
  height: 40px;
  width: 80px;
  float: right;
  margin-right: 70px;
  cursor: pointer;
`;

const ChoicesContainer = styled.div``;

const AnswerContainer = styled.div`
  background-color: ${(props) => props.theme.palette.primary.light};
  min-height: 200px;
  height: 100%;
  padding: 20px 30px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const CorrectAnswerRate = styled.div`
  text-align: center;
`;

const lightIcons = [A_light, B_light, C_light, D_light, E_light, F_light, G_light, H_light];
const darkIcons = [A_dark, B_dark, C_dark, D_dark, E_dark, F_dark, G_dark, H_dark];

type Choice = {
  id: number;
  choice: string;
  is_right: string;
  clicked: "clicked" | "right" | "wrong";
};

const Study = () => {
  const [choices, setChoices] = useState<Choice[]>([]),
    [quizzes, setQuizzes] = useState<string[]>([]),
    [open, setOpen] = useState(false),
    [count, setCount] = useState(1),
    [checked, setChecked] = useState(false),
    [correctQuiz, setCorrectQuiz] = useState(0),
    [answeredQuiz, setAnsweredQuiz] = useState(0),
    [tabIndex, setTabIndex] = useState(0);

  const checkAnswers = (index: number) => {
    if (checked === true) return;

    const rightChoices = choices.filter((choice) => choice.is_right);
    const newChoices = [...choices];
    newChoices[index] = { ...newChoices[index], clicked: "clicked" };
    setChoices(newChoices);

    if (rightChoices.length > count) {
      setCount(count + 1);
      return;
    }

    if (isCorrectChoices(newChoices)) {
      setCorrectQuiz(correctQuiz + 1);
    }

    setAnsweredQuiz(answeredQuiz + 1);
    setChecked(true);
    setOpen(true);

    newChoices.map((newChoice) => {
      if (newChoice.is_right.toString() === "true") {
        newChoice.clicked = "right";
      }
      if (newChoice.clicked === "clicked" && newChoice.is_right.toString() === "false") {
        newChoice.clicked = "wrong";
      }
    });
  };

  const isCorrectChoices = (newChoices: Choice[]) => {
    let isCorrect = true;
    for (let i = 0; i < newChoices.length; i++) {
      if (newChoices[i].is_right.toString() === "false" && newChoices[i].clicked === "clicked") {
        isCorrect = false;
      }
    }
    return isCorrect;
  };

  useEffect(() => {
    const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes/";
    axios.get(quizApiEndpoint).then((resp) => {
      const newQuizzes = resp.data.map((newQuiz: any) => newQuiz.title);
      setQuizzes(newQuizzes);
    });

    const choicesApiEndpoint = process.env.REACT_APP_API_URL + "choices/index/" + 468;
    axios.get(choicesApiEndpoint).then((resp) => {
      setChoices(resp.data);
    });
  }, []);

  return (
    <Container>
      <Heading>神経内科Ⅰ</Heading>
      <SelectArea>
        <Caption>問題{tabIndex + 1}</Caption>
        <QuizContainer>
          <p>{quizzes[tabIndex]}</p>
        </QuizContainer>
        <Spacer size="xs" />
        <ChoicesContainer>
          {choices.map((choice, index) => (
            <ChoiceContainer key={choice.id} onClick={() => checkAnswers(index)}>
              {choices === [] ? (
                <></>
              ) : choices[index].clicked === "right" ? (
                <StyledCheckCircle />
              ) : choices[index].clicked === "wrong" ? (
                <StyledCancel />
              ) : choices[index].clicked === "clicked" ? (
                <Image src={darkIcons[index]} />
              ) : (
                <Image src={lightIcons[index]} />
              )}
              <p>{choice.choice}</p>
            </ChoiceContainer>
          ))}
          <Spacer size="xs" />
        </ChoicesContainer>
        <CSSTransition classNames="answer" in={open} timeout={1000} exit={false}>
          {open ? <AnswerContainer>選択肢１</AnswerContainer> : <></>}
        </CSSTransition>
        <Spacer size="sm" />
        <CorrectAnswerRate>
          {answeredQuiz === 0 ? (
            <div>
              <p>無理せず頑張っていきましょう！！</p>
            </div>
          ) : (
            <div>
              <p>
                現在のあなたの成績は{correctQuiz}/{answeredQuiz}問正解！！
              </p>
              <p>正答率 {(correctQuiz / answeredQuiz) * 100}%！</p>
            </div>
          )}
        </CorrectAnswerRate>
        {tabIndex > 0 && (
          <StyledArrowLeft src={arrowLeft} onClick={() => setTabIndex(tabIndex - 1)} />
        )}
        {tabIndex < 6 && (
          <StyledArrowRight src={arrowRight} onClick={() => setTabIndex(tabIndex + 1)} />
        )}
      </SelectArea>
    </Container>
  );
};

export default Study;
