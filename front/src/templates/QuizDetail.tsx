import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { PrimaryButton, SecondaryButton, Spacer, TextInput } from "../components/UIkit";
import { ConfirmUpdateDialog } from "../components/ConfirmDialog";
import { SetChoicesArea } from "../components/SetChoicesArea.tsx";
import { DeleteDialog } from "../components/DeleteDialog";
import { deleteQuiz } from "../reducks/quizzes/operations";
import Select, { MultiValue } from "react-select";
import { push } from "connected-react-router";
import { fetchCategories } from "../reducks/categories/operations";
import { getCategories } from "../reducks/categories/selectors";
import { RootState } from "../types/entity/rootState";
import axios from "axios";
import styled from "styled-components";
import { Category } from "../types/entity/category";

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
  id?: number;
  choice: string;
  is_right: string;
};

type OptionType = {
  id: number;
  value: number;
  label: string;
};

const QuizDetail = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const categories = getCategories(selector);
  const match = useRouteMatch<MatchParams>();

  const [quiz, setQuiz] = useState(""),
    [selectedCategories, setSelectedCategories] = useState<MultiValue<OptionType>>([]),
    [choices, setChoices] = useState<Choice[]>([]),
    [commentary, setCommentary] = useState(""),
    [open, setOpen] = useState(false),
    [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const quizApiEndpoint = process.env.REACT_APP_API_URL + "quizzes/" + match.params.id;
    const choiceApiEndpoint = process.env.REACT_APP_API_URL + "choices?quiz_id=" + match.params.id;
    const commentaryApiEndpoint =
      process.env.REACT_APP_API_URL + "commentaries?quiz_id=" + match.params.id;
    const categoriesApiEndpoint =
      process.env.REACT_APP_API_URL + "categories?quiz_id=" + match.params.id;
    let isMounted = true;

    dispatch(fetchCategories());

    axios.get(quizApiEndpoint).then((resp) => {
      if (isMounted) {
        setQuiz(resp.data.title);
      }
    });

    axios.get(choiceApiEndpoint).then((resp) => {
      if (isMounted) {
        setChoices(resp.data);
      }
    });

    axios.get(commentaryApiEndpoint).then((resp) => {
      if (isMounted) {
        setCommentary(resp.data.text);
      }
    });

    axios.get(categoriesApiEndpoint).then((resp) => {
      if (isMounted) {
        const newCategories = resp.data.map((res: Category) => ({
          id: res.id,
          value: res.id,
          label: res.name,
        }));
        setSelectedCategories(newCategories);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
    const isRightList = choices.map((choice) => choice.is_right.toString());
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
      <Select
        isMulti
        options={options}
        placeholder={"カテゴリーを選択してください"}
        onChange={(inputValue) => inputSelectedCategories(inputValue)}
        value={selectedCategories}
      />
      <Spacer size="sm" />
      <SetChoicesArea choices={choices} setChoices={setChoices} />
      <Spacer size="sm" />
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
      <Spacer size="xs" />
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
        categories={selectedCategories}
        choices={choices}
        commentary={commentary}
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
