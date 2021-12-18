import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { SelectBox, TextInput, PrimaryButton } from "../components/UIkit";
import Select from "react-select";
import { ConfirmCreateDialog } from "../components/ConfirmDialog";
import { MenuItem } from "@material-ui/core";
import { fetchCategories } from "../reducks/categories/operations";
import { getCategories } from "../reducks/categories/selectors";
import { RootState } from "../types/entity/rootState";

const useStyles = makeStyles({
  container: {
    margin: "30px auto",
    maxWidth: 800,
    padding: "35px 70px",
    height: "auto",
    width: "calc(100% - 2rem)",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px grey",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  select: {
    fontSize: 12,
  },
});

const CreateQuiz = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const categories = getCategories(selector);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [quiz, setQuiz] = useState(""),
    [choice1, setChoice1] = useState(""),
    [choice2, setChoice2] = useState(""),
    [choice3, setChoice3] = useState(""),
    [choice4, setChoice4] = useState(""),
    [select1, setSelect1] = useState(""),
    [select2, setSelect2] = useState(""),
    [select3, setSelect3] = useState(""),
    [select4, setSelect4] = useState(""),
    [open, setOpen] = useState(false);

  const inputQuiz = useCallback((event) => {
    setQuiz(event.target.value);
  }, [setQuiz]);

  const inputChoice1 = useCallback((event) => {
    setChoice1(event.target.value);
  }, [setChoice1]);

  const inputChoice2 = useCallback((event) => {
    setChoice2(event.target.value);
  }, [setChoice2]);
  

  const inputChoice3 = useCallback((event) => {
    setChoice3(event.target.value);
  }, [setChoice3]);

  const inputChoice4 = useCallback((event) => {
    setChoice4(event.target.value);
  }, [setChoice4]);
  
  const inputSelect1 = useCallback((event) => {
    setSelect1(event.target.value);
  }, [setSelect1]);

  const inputSelect2 = useCallback((event) => {
    setSelect2(event.target.value);
  }, [setSelect2]);

  const inputSelect3 = useCallback((event) => {
    setSelect3(event.target.value);
  }, [setSelect3]);

  const inputSelect4 = useCallback((event) => {
    setSelect4(event.target.value);
  }, [setSelect4]);

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
    <div className={classes.container}>
      <h2 className={classes.headline}>クイズ作成</h2>
      <div className="module-spacer--extra-small" />
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
      <div className="module-spacer--small" />
      <Select
        isMulti
        options={options}
        placeholder={"カテゴリーを選択してください"}
      />
      <div className="module-spacer--small" />
      <TextInput
        fullWidth={true}
        label={"選択肢１"}
        multiline={true}
        required={true}
        rows={1}
        value={choice1}
        type={"text"}
        onChange={inputChoice1}
      />
      <SelectBox
        displayEmpty={true}
        value={select1}
        variant="standard"
        onChange={inputSelect1}
      >
        <div className={classes.select}>
          <MenuItem value="">- 選択してください -</MenuItem>
          {menus.map((menu) => (
            <MenuItem value={menu.value} key={menu.id} >
              {menu.label}
            </MenuItem>
          ))}
        </div>
      </SelectBox>
      <div className="module-spacer--extra-extra-small" />
      <TextInput
        fullWidth={true}
        label={"選択肢２"}
        multiline={true}
        required={true}
        rows={1}
        value={choice2}
        type={"text"}
        onChange={inputChoice2}
      />
      <SelectBox
        displayEmpty={true}
        value={select2}
        variant="standard"
        onChange={inputSelect2}
      >
        <div>
          <MenuItem value="">- 選択してください -</MenuItem>
          {menus.map((menu) => (
            <MenuItem value={menu.value} key={menu.id} >
              {menu.label}
            </MenuItem>
          ))}
        </div>
      </SelectBox>
      <div className="module-spacer--extra-extra-small" />
      <TextInput
        fullWidth={true}
        label={"選択肢３"}
        multiline={true}
        rows={1}
        value={choice3}
        type={"text"}
        onChange={inputChoice3}
      />
      <SelectBox
        displayEmpty={true}
        value={select3}
        variant="standard"
        onChange={inputSelect3}
      >
        <div>
          <MenuItem value="">- 選択してください -</MenuItem>
          {menus.map((menu) => (
            <MenuItem value={menu.value} key={menu.id} >
              {menu.label}
            </MenuItem>
          ))}
        </div>
      </SelectBox>
      <div className="module-spacer--extra-extra-small" />
      <TextInput
        fullWidth={true}
        label={"選択肢４"}
        multiline={true}
        rows={1}
        value={choice4}
        type={"text"}
        onChange={inputChoice4}
      />
      <SelectBox
        displayEmpty={true}
        value={select4}
        variant="standard"
        onChange={inputSelect4}
      >
        <div>
          <MenuItem value="">- 選択してください -</MenuItem>
          {menus.map((menu) => (
            <MenuItem value={menu.value} key={menu.id} >
              {menu.label}
            </MenuItem>
          ))}
        </div>
      </SelectBox>
      <div className="module-spacer--medium" />
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
    </div>
  );
};

export default CreateQuiz;
