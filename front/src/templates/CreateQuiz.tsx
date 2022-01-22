import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import { SetChoicesArea } from "../components/SetChoicesArea.tsx";
import Select from "react-select";
import { ConfirmCreateDialog } from "../components/ConfirmDialog";
import { fetchCategories } from "../reducks/categories/operations";
import { getCategories } from "../reducks/categories/selectors";
import { RootState } from "../types/entity/rootState";
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

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const categories = getCategories(selector);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  type Choice = {
    choice: string;
    isRight: string;
  };

  const [quiz, setQuiz] = useState(""),
    [choices, setChoices] = useState<Choice[]>([{choice: "", isRight: ""}, {choice: "", isRight: ""}]),
    [open, setOpen] = useState(false);

  const inputQuiz = useCallback((event) => {
    setQuiz(event.target.value);
  }, [setQuiz]);

  const handleDialogClose = () => setOpen(false);
  
  const handleDialogOpen = () => {
    if (![select1, select2, select3, select4].includes("true")) {
      alert("少なくとも１つは正しい選択肢が必要です。");
      return;
    }
    if (![select1, select2, select3, select4].includes("false")) {
      alert("少なくとも１つは誤った選択肢が必要です。");
      return;
    }
    setOpen(true);
  };

  const menus = [
    { label: "wrong", value: "false", id: "wrong" },
    { label: "right", value: "true", id: "right" },
  ];

  const options = categories.map((category) => (
    {
      id: category.id,
      value: category.id,
      label: category.name,
    }
  ));

  return (
    <Container>
      <Heading>クイズ作成</Heading>
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
      <Select
        isMulti
        options={options}
        placeholder={"カテゴリーを選択してください"}
      />
      <Spacer size="sm" />
      <SetChoicesArea choices={choices} setChoices={setChoices} />
      <Spacer size="sm" />
      <PrimaryButton
        label={"クイズを作成する"}
        fullWidth={true}
        disabled={!quiz || !choice1 || !choice2}
        onClick={() => handleDialogOpen()}
      />
      <ConfirmCreateDialog
        quiz={quiz}
        choice1={choice1} choice2={choice2} choice3={choice3} choice4={choice4}
        select1={select1} select2={select2} select3={select3} select4={select4}
        open={open}
        onClose={handleDialogClose}
      />
    </Container>
  );
};

export default CreateQuiz;
