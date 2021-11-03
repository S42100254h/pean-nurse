import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TextInput, PrimaryButton } from "../components/UIkit";

const useStyles = makeStyles({
  "container": {
    margin: "30px auto",
    maxWidth: 600,
    padding: "35px 70px",
    height: "auto",
    width: "calc(100% - 2rem)",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px grey",
  },
  "headline": {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
});

const CreateQuiz = () => {
  const classes = useStyles();
  
  const [quiz, setQuiz] = useState(""),
    [choice1, setChoice1] = useState(""),
    [choice2, setChoice2] =useState(""),
    [choice3, setChoice3] =useState(""),
    [choice4, setChoice4] =useState(""),
    [open, setOpen] =useState(false);

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
  
  const handleDialogToggle = () => setOpen(!open);

  return (
    <div className={classes.container}>
      <h2 className={classes.headline}>クイズ作成</h2>
      <div className="module-spacer--extra-small" />
      <TextInput
        fullWidth={true}
        label={"問題文"}
        multiline={true}
        required={true}
        row={1}
        value={quiz}
        type={"text"}
        onChange={inputQuiz}
      />
      <div className="module-spacer--small" />
      <TextInput
        fullWidth={true}
        label={"選択肢１"}
        multiline={true}
        required={true}
        row={1}
        value={choice1}
        type={""}
        onChange={inputChoice1}
      />
      <div className="module-spacer--extra-extra-small" />
      <TextInput
        fullWidth={true}
        label={"選択肢２"}
        multiline={true}
        required={true}
        row={1}
        value={choice2}
        type={""}
        onChange={inputChoice2}
      />
      <div className="module-spacer--extra-extra-small" />
      <TextInput
        fullWidth={true}
        label={"選択肢３"}
        multiline={true}
        required={true}
        row={1}
        value={choice3}
        type={""}
        onChange={inputChoice3}
      />
      <div className="module-spacer--extra-extra-small" />
      <TextInput
        fullWidth={true}
        label={"選択肢４"}
        multiline={true}
        required={true}
        row={1}
        value={choice4}
        type={""}
        onChange={inputChoice4}
      />
      <div className="module-spacer--medium" />
      <PrimaryButton
        label={"クイズを作成する"}
        fullWidth={true}
        disabled={!quiz || !choice1 || !choice2}
        onClick={() => handleDialogToggle()}
      />
    </div>
  );
};

export default CreateQuiz;
