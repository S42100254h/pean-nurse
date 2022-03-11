import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { Spacer, Swiper } from "../components/UIkit";
import { GetExperienceDialog } from "../components/GetExperienceDialog";
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
import { createBadge } from "../function/badge";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { Quiz } from "../types/entity/quiz";
import { PassFail } from "../components/PassFail";
import styled, { css } from "styled-components";
import { push } from "connected-react-router";
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

const Label = styled.button`
  font-size: 12px;
  color: #fff;
  display: flex;
  justify-content: center;
  width: 100px;
  padding: 8px;
  float: left;
  margin-bottom: 15px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.theme.palette.primary.main};
  ${(props) =>
    props.disabled
      ? css`
          background-color: ${(props) => props.theme.palette.basic.main};
        `
      : css`
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        `}
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin: 0 auto;
  padding: 20px 150px;
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
  id: number;
  title: string;
  checked: boolean;
  count: number;
  isCorrect: boolean | undefined;
  open: boolean;
};

type Commentary = {
  text: string;
};

type ImageProp = {
  url: string;
};

type CategoryProfile = {
  id: string;
  title: string;
  image: ImageProp;
  caption: string;
  uid: string;
};

type MatchParams = {
  id: string;
};

const Study = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();
  const [choices, setChoices] = useState<Choice[][]>([]);
  const [categoryProfile, setCategoryProfile] = useState<CategoryProfile>(),
    [categoryId, setCategoryId] = useState(""),
    [quizzes, setQuizzes] = useState<QuizType[]>([]),
    [quizzesLength, setQuizzesLength] = useState(0),
    [commentaries, setCommentaries] = useState<Commentary[]>([]),
    [correctQuiz, setCorrectQuiz] = useState(0),
    [answeredQuiz, setAnsweredQuiz] = useState(0),
    [fire, setFire] = useState(false),
    [open, setOpen] = useState(false);

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

  const calcCorrectAnswerRate = () => {
    return Math.round((correctQuiz / answeredQuiz) * 100);
  };

  const handleFire = (e: number) => {
    if (quizzes.length === answeredQuiz && quizzes.length === e) {
      setFire(true);
    }
    return;
  };

  const carculateExp = () => {
    if (correctQuiz === answeredQuiz) {
      return 100;
    } else {
      return correctQuiz * 10;
    }
  };

  const previousQuizUrl = match.url.slice(0, -1) + (Number(match.params.id) - 1);
  const nextQuizUrl = match.url.slice(0, -1) + (Number(match.params.id) + 1);

  const isFirstRender = useRef(false);

  useEffect(() => {
    dispatch(showLoadingAction("Loading..."));
    isFirstRender.current = true;

    setTimeout(() => {
      dispatch(hideLoadingAction());
    }, 1300);
    const category_profile_uid = match.url.split("/")[2];
    const quizApiEndpoint =
      process.env.REACT_APP_API_URL + "quizzes/exam/" + category_profile_uid + "/" + match.params.id;
    let isMounted = true;

    axios.get(quizApiEndpoint).then((resp) => {
      if (isMounted) {
        const newQuizzes = resp.data.map((newQuiz: Quiz) => ({
          id: newQuiz.id,
          title: newQuiz.title,
          checked: false,
          count: 1,
          isCorrect: undefined,
          open: false,
        }));
        setQuizzes(newQuizzes);

        const quiz_ids = resp.data.map((newQuiz: Quiz) => newQuiz.id);

        const choicesApiEndpoint = process.env.REACT_APP_API_URL + "choices";
        axios.get(choicesApiEndpoint, { params: { quiz_id: quiz_ids } }).then((resp) => {
          setChoices(resp.data);
        });

        const commentariesApiEndpoint = process.env.REACT_APP_API_URL + "commentaries";
        axios.get(commentariesApiEndpoint, { params: { quiz_id: quiz_ids } }).then((resp) => {
          setCommentaries(resp.data);
        });
      }
    });

    const categoryProfileApiEndpoint = process.env.REACT_APP_API_URL + "category_profiles/" + category_profile_uid;
    axios.get(categoryProfileApiEndpoint).then((resp) => {
      if (isMounted) {
        setCategoryProfile(resp.data);
        setCategoryId(resp.data.category_id);
        const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes?category_id=" + resp.data.category_id;

        axios.get(quizApiEndpoint).then((r) => {
          const courseNumber = Math.floor(r.data.length / 7);
          setQuizzesLength(courseNumber);
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // check wether first render or not
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (correctQuiz / answeredQuiz === 1) {
        dispatch(createBadge(match.params.id, categoryId));
      }

      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
  }, [fire]);

  return (
    <Container>
      <Heading>{categoryProfile?.title + match.params.id}</Heading>
      <SelectArea>
        <Swiper onClick={(e) => handleFire(e)}>
          {quizzes?.map((quiz, i) => (
            <div key={i}>
              <QuizContainer>
                <QuizTitle>問題{i + 1}</QuizTitle>
                <PassFail checked={quiz.checked} isCorrect={quiz.isCorrect} />
              </QuizContainer>
              <QuizText>{quiz.title}</QuizText>
              <Spacer size="xs" />
              <ChoicesContainer>
                {choices[i]?.map((choice, index) => (
                  <ChoiceContainer key={choice.id} onClick={() => checkAnswers(i, index)}>
                    {choice.clicked === "right" ? (
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
                ))}
                <Spacer size="xs" />
              </ChoicesContainer>
              {quiz.open ? <AnswerContainer>{commentaries[i]?.text}</AnswerContainer> : <></>}
            </div>
          ))}
          {quizzes.length === answeredQuiz && (
            <div>
              <Image src={cat} />
              <ResultTextArea>
                <p>お疲れ様でした！！</p>
                {calcCorrectAnswerRate() === 100 ? (
                  <p>完璧です！！この調子で学習を進めましょう！！</p>
                ) : calcCorrectAnswerRate() > 80 ? (
                  <p>おしい！！この調子で学習を進めましょう！！</p>
                ) : (
                  <p>分からないところは復習しながら学習を進めましょう！！</p>
                )}
              </ResultTextArea>
            </div>
          )}
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
              <p>正答率 {calcCorrectAnswerRate()}%！</p>
            </div>
          )}
        </CorrectAnswerRate>
      </SelectArea>
      <LabelContainer>
        <Label disabled={match.params.id === "1"} onClick={() => dispatch(push(previousQuizUrl))}>
          前のクイズへ
        </Label>
        <Label disabled={Number(match.params.id) === quizzesLength} onClick={() => dispatch(push(nextQuizUrl))}>
          次のクイズへ
        </Label>
      </LabelContainer>
      <GetExperienceDialog
        open={open}
        addedExp={carculateExp()}
        onClose={() => setOpen(false)}
        path={nextQuizUrl}
        disabled={Number(match.params.id) === quizzesLength}
      />
    </Container>
  );
};

export default Study;
