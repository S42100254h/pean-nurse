import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import { SetChoicesArea } from "../components/SetChoicesArea.tsx";
import Select, { MultiValue } from "react-select";
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

  type Choice = {
    choice: string;
    is_right: string;
  };

  type OptionType = {
    id: number;
    value: number;
    label: string;
  };

  const [quiz, setQuiz] = useState(""),
    [choices, setChoices] = useState<Choice[]>([
      { choice: "", is_right: "" },
      { choice: "", is_right: "" },
    ]),
    [selectedCategories, setSelectedCategories] = useState<MultiValue<OptionType>>([]),
    [commentary, setCommentary] = useState(""),
    [open, setOpen] = useState(false);

  const inputQuiz = useCallback(
    (event) => {
      setQuiz(event.target.value);
    },
    [setQuiz],
  );

  const inputSelectedCategories = (inputValue: MultiValue<OptionType>) => {
    setSelectedCategories(inputValue);
  };

  const inputCommentary = useCallback(
    (event) => {
      setCommentary(event.target.value);
    },
    [setCommentary],
  );

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
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
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

  const options = categories.map((category) => ({
    id: category.id,
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
        onChange={(inputValue) => inputSelectedCategories(inputValue)}
        value={selectedCategories}
      />
      <Spacer size="sm" />
      <SetChoicesArea choices={choices} setChoices={setChoices} />
      <Spacer size="xs" />
      <TextInput
        fullWidth={true}
        label={"解説文"}
        multiline={true}
        required={true}
        rows={3}
        value={commentary}
        type={"text"}
        onChange={inputCommentary}
      />
      <Spacer size="sm" />
      <PrimaryButton
        label={"クイズを作成する"}
        fullWidth={true}
        disabled={!quiz || !isDisabled(choices) || !commentary}
        onClick={() => handleDialogOpen()}
      />
      <ConfirmCreateDialog
        quiz={quiz}
        choices={choices}
        commentary={commentary}
        open={open}
        onClose={handleDialogClose}
      />
    </Container>
  );
};

export default CreateQuiz;
