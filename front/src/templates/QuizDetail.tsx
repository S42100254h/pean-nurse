import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { PrimaryButton, SecondaryButton, Spacer, TextInput } from "../components/UIkit";
import { ConfirmUpdateDialog } from "../components/ConfirmDialog";
import { SetChoicesArea } from "../components/SetChoicesArea.tsx";
import { DeleteDialog } from "../components/DeleteDialog";
import { deleteQuiz } from "../reducks/quizzes/operations";
import { push } from "connected-react-router";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px auto;
  max-width: 800px;
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

type MatchParams = {
  id: string;
};

type Choice = {
  choice: string;
  is_right: string;
};

const QuizDetail = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();

  const [quiz, setQuiz] = useState(""),
    [choices, setChoices] = useState<Choice[]>([]),
    [open, setOpen] = useState(false),
    [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes/" + match.params.id;
    const choiceApiEndpoint = process.env.REACT_APP_API_URL + "choices/index/" + match.params.id;
    let isMounted = true;
    
    axios
      .get(quizApiEndpoint)
      .then((resp) => {
        if (isMounted) {
          setQuiz(resp.data.title);
        }
      });
    
    axios
      .get(choiceApiEndpoint)
      .then((resp) => {
        if (isMounted) {
          setChoices(resp.data);
        }
      });

    return () => { isMounted = false; };
  }, []);

  const inputQuiz = useCallback((event) => {
    setQuiz(event.target.value);
  }, [setQuiz]);

  const handleDialogClose = () => setOpen(false);
  
  const handleDialogOpen = () => {
    const isRightList = choices.map((choice) => choice.is_right);
    if (![...isRightList].includes("true")) {
      alert("少なくとも１つは正しい選択肢が必要です。");
      return;
    }
    if (![...isRightList].includes("false")) {
      alert("少なくとも１つは誤った選択肢が必要です。");
      return;
    }
    setOpen(true);
  };
  const isDisabled = (args: Choice[]) => {
    let disabled = true;
    for (let i = 0; i < args.length; i=(i+1)|0) {
      if (args[i].choice === "" || args[i].is_right === "") {
        disabled = false;
      }
    }
    return disabled;
  };

  const menus = [
    { label: "wrong", value: "false", id: "wrong" },
    { label: "right", value: "true", id: "right" },
  ];

  return (
    <Container>
      <Heading>クイズ詳細</Heading>
      <Spacer size="xs" />
      <TextInput
        fullWidth={true}
        label={"問題文"}
        multiline={true}
        required={true}
        rows={1}
        value={quiz}
        type={"text"}
        onChange={inputQuiz}
      />
      <Spacer size="sm" />
      <SetChoicesArea choices={choices} setChoices={setChoices} />
      <Spacer size="sm" />
      <PrimaryButton
        label={"クイズを更新する"}
        fullWidth={true}
        disabled={!quiz || !isDisabled(choices)}
        onClick={() => handleDialogOpen()}
      />
      <Spacer size="xs" />
      <SecondaryButton
        label={"クイズを削除する"}
        fullWidth={true}
        onClick={() => setIsOpen(true)}
      />
      <ConfirmUpdateDialog
        id={match.params.id}
        quiz={quiz}
        choices={choices}
        open={open}
        onClose={handleDialogClose}
      />
      <DeleteDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onClickStop={() => setIsOpen(false)}
        onClickProceed={() => {
          dispatch(deleteQuiz(match.params.id));
          setIsOpen(false);
          setTimeout(() => {
            dispatch(push("/quiz/list"));
          }, 100);
        }}
      />
    </Container>
  );
};

export default QuizDetail;
