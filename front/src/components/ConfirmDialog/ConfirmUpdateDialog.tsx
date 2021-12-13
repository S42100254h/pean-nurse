import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton } from "../UIkit";
import { Choice, Quiz } from "./index";
import { editQuiz } from "../../function/quiz";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: "30px 50px",
  },
  headline: {
    color: "#4dd0e1",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
});

type Props = {
  quiz: string;
  choice1: string;
  select1: boolean;
  choice2: string;
  select2: boolean;
  choice3: string;
  select3: boolean;
  choice4: string;
  select4: boolean;
  id1: number | null;
  id2: number | null;
  id3: number | null;
  id4: number | null;
  open: boolean;
  onClose: Function;
  id: string;
};

const ConfirmUpdateDialog = ({ quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4, id1, id2, id3, id4, open, onClose, id }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={(e) => onClose(e)}
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogContent>
          <div className={classes.container}>
            <div className={classes.headline}>以下の内容でクイズを更新してもよろしいですか？</div>
            <div className="module-spacer--extra-small" />
            <Quiz quiz={quiz} label={"問題"} />
            <Choice choice={choice1} select={select1} label={"選択肢１"} />
            <Choice choice={choice2} select={select2} label={"選択肢２"} />
            <Choice choice={choice3} select={select3} label={"選択肢３"} />
            <Choice choice={choice4} select={select4} label={"選択肢４"} />
            <div className="module-spacer--extra-extra-small" />
            <PrimaryButton
              label={"クイズを更新する"}
              fullWidth={true}
              onClick={() => dispatch(editQuiz(quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4, id1, id2, id3, id4, id))}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmUpdateDialog;
