import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, Spacer } from "../UIkit";
import { ChoiceCard, Quiz } from "./index";
import { editQuiz } from "../../function/quiz";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 30px 50px;
`;

const Headline = styled.div`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

type Choice = {
  choice: string;
  is_right: string;
};

type Props = {
  quiz: string;
  choices: Choice[];
  open: boolean;
  onClose: () => void;
  id: string;
};

const ConfirmUpdateDialog = ({ quiz, choices, open, onClose, id }: Props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={open} onClose={() => onClose()} fullWidth={false} maxWidth={"md"}>
        <DialogContent>
          <Container>
            <Headline>以下の内容でクイズを更新してもよろしいですか？</Headline>
            <Spacer size="xs" />
            <Quiz quiz={quiz} label={"問題"} />
            {choices.map((choice, index) => (
              <ChoiceCard
                choice={choice.choice}
                select={choice.is_right.toString()}
                label={"選択肢" + (index + 1)}
                key={index}
              />
            ))}
            <Spacer size="xxs" />
            <PrimaryButton
              label={"クイズを更新する"}
              fullWidth={true}
              onClick={() => dispatch(editQuiz(quiz, choices, id))}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmUpdateDialog;
