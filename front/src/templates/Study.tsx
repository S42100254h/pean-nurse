import React, { useEffect, useState } from "react";
import { Spacer, Swiper } from "../components/UIkit";
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
import cat from "../assets/img/cat.png";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { Quiz } from "../types/entity/quiz";
import { PassFail } from "../components/PassFail";
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

const SelectArea = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 85%;
  margin: 0 auto;
  padding: 50px 70px 80px 70px;
`;

const QuizTitle = styled.p`
  font-weight: bold;
  display: inline-block;
  padding: 2px 10px 2px 0;
`;

const QuizText = styled.div`
  padding-top: 10px;
  clear: both;
`;

const QuizContainer = styled.div`
  float: left;
  width: 100%;
  padding: 5px 0;
  height: 40px;
  border-bottom: 1px solid #000;
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

const Icon = styled.img`
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

const ResultTextArea = styled.div`
  height: 200px;
  background-color: ${(props) => props.theme.palette.primary.light};
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 20px;
`;

const Image = styled.img`
  height: 180px;
  width: 180px;
  margin: 0 auto;
`;

const lightIcons = [A_light, B_light, C_light, D_light, E_light, F_light, G_light, H_light];
const darkIcons = [A_dark, B_dark, C_dark, D_dark, E_dark, F_dark, G_dark, H_dark];

type Choice = {
  id: number;
  choice: string;
  is_right: boolean;
  clicked: "clicked" | "right" | "wrong";
};

type QuizType = {
  title: string;
  checked: boolean;
  count: number;
  isCorrect: boolean | undefined;
  open: boolean;
};

const Study = () => {
  const [choices, setChoices] = useState<Choice[][]>([]),
    [quizzes, setQuizzes] = useState<QuizType[]>([]),
    [correctQuiz, setCorrectQuiz] = useState(0),
    [answeredQuiz, setAnsweredQuiz] = useState(0);

  const checkAnswers = (i: number, index: number) => {
    if (quizzes[i].checked === true) return;

    const rightChoices = choices[i].filter((choice) => choice.is_right);
    const newChoices = choices;
    if (newChoices[i][index].clicked === "clicked") {
      return;
    } else {
      newChoices[i][index] = { ...newChoices[i][index], clicked: "clicked" };
      setChoices(newChoices);
    }

    if (rightChoices.length > quizzes[i].count) {
      const selectedQuizzes = [...quizzes];
      selectedQuizzes[i].count++;
      setQuizzes(selectedQuizzes);
      return;
    }

    if (isCorrectChoices(newChoices[i])) {
      const selectedQuizzes = [...quizzes];
      selectedQuizzes[i].isCorrect = true;
      setQuizzes(selectedQuizzes);

      setCorrectQuiz(correctQuiz + 1);
    } else {
      const selectedQuizzes = [...quizzes];
      selectedQuizzes[i].isCorrect = false;
      setQuizzes(selectedQuizzes);
    }

    setAnsweredQuiz(answeredQuiz + 1);

    const newQuizzes = quizzes;
    newQuizzes[i].checked = true;
    newQuizzes[i].open = true;
    setQuizzes(newQuizzes);

    newChoices[i].map((newChoice) => {
      if (newChoice.is_right === true) {
        newChoice.clicked = "right";
      }
      if (newChoice.clicked === "clicked" && newChoice.is_right === false) {
        newChoice.clicked = "wrong";
      }
    });
  };

  const isCorrectChoices = (newChoices: Choice[]) => {
    let isCorrect = true;
    for (let i = 0; i < newChoices.length; i++) {
      if (newChoices[i].is_right === false && newChoices[i].clicked === "clicked") {
        isCorrect = false;
      }
    }
    return isCorrect;
  };

  const isOpen = (i: number) => {
    if (quizzes[i] === undefined) return false;
    return quizzes[i].open;
  };

  useEffect(() => {
    const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes/";
    axios.get(quizApiEndpoint).then((resp) => {
      const newQuizzes = resp.data.map((newQuiz: Quiz) => ({
        title: newQuiz.title,
        checked: false,
        count: 1,
        isCorrect: undefined,
        open: false,
      }));
      setQuizzes(newQuizzes);
    });

    const choicesApiEndpoint =
      process.env.REACT_APP_API_URL +
      "choices?quiz_id[]=462&quiz_id[]=463&quiz_id[]=464&quiz_id[]=465&quiz_id[]=466&quiz_id[]=467&quiz_id[]=468";
    axios.get(choicesApiEndpoint).then((resp) => {
      setChoices(resp.data);
    });
  }, []);

  return (
    <Container>
      <Heading>神経内科Ⅰ</Heading>
      <SelectArea>
        <Swiper>
          {quizzes.map((quiz, i) => (
            <div key={i}>
              <QuizContainer>
                <QuizTitle>問題{i + 1}</QuizTitle>
                {quiz === undefined ? (
                  <></>
                ) : (
                  <PassFail checked={quiz.checked} isCorrect={quiz.isCorrect} />
                )}
              </QuizContainer>
              {quiz === undefined ? <></> : <QuizText>{quiz.title}</QuizText>}
              <Spacer size="xs" />
              <ChoicesContainer>
                {choices[i] === undefined ? (
                  <></>
                ) : (
                  choices[i].map((choice, index) => (
                    <ChoiceContainer key={choice.id} onClick={() => checkAnswers(i, index)}>
                      {choices[i] === [] ? (
                        <></>
                      ) : choice.clicked === "right" ? (
                        <StyledCheckCircle />
                      ) : choice.clicked === "wrong" ? (
                        <StyledCancel />
                      ) : choice.clicked === "clicked" ? (
                        <Icon src={darkIcons[index]} />
                      ) : (
                        <Icon src={lightIcons[index]} />
                      )}
                      <p>{choice.choice}</p>
                    </ChoiceContainer>
                  ))
                )}
                <Spacer size="xs" />
              </ChoicesContainer>
              {quiz === undefined ? (
                <></>
              ) : quiz.open ? (
                <AnswerContainer>選択肢１</AnswerContainer>
              ) : (
                <></>
              )}
            </div>
          ))}
          <div>
            <Image src={cat} />
            <ResultTextArea>
              <p>お疲れ様でした！！</p>
            </ResultTextArea>
          </div>
        </Swiper>
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
              <p>正答率 {Math.round((correctQuiz / answeredQuiz) * 100)}%！</p>
            </div>
          )}
        </CorrectAnswerRate>
      </SelectArea>
    </Container>
  );
};

export default Study;
