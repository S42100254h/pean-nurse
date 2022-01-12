import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, Spacer } from "../UIkit";
import { Choice, Quiz } from "./index";
import { createQuiz } from "../../function/quiz";
import styled from "styled-components";

const Container =styled.div`
  width: 100%;
  padding: 30px 50px;
`;

const Headline = styled.div`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

type Props = {
  quiz: string;
  choice1: string;
  select1: string;
  choice2: string;
  select2: string;
  choice3: string;
  select3: string;
  choice4: string;
  select4: string;
  open: boolean;
  onClose: () => void;
};

const ConfirmCreateDialog = ({ quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4, open, onClose }: Props) => {
  const dispatch = useDispatch();
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => onClose()}
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogContent>
          <Container>
            <Headline>以下の内容でクイズを作成してもよろしいですか？</Headline>
            <Spacer size="xs" />
            <Quiz quiz={quiz} label={"問題"} />
            <Choice choice={choice1} select={select1} label={"選択肢１"} />
            <Choice choice={choice2} select={select2} label={"選択肢２"} />
            <Choice choice={choice3} select={select3} label={"選択肢３"} />
            <Choice choice={choice4} select={select4} label={"選択肢４"} />
            <Spacer size="xxs" />
            <PrimaryButton
              label={"クイズを作成する"}
              fullWidth={true}
              onClick={() => dispatch(createQuiz(quiz, choice1, select1, choice2, select2, choice3, select3, choice4, select4))}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmCreateDialog;
