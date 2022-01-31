import React from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { PrimaryButton, Spacer } from "../UIkit";
import { ChoiceCard, Quiz } from "./index";
import { createQuiz } from "../../function/quiz";
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
};

const ConfirmCreateDialog = ({ quiz, choices, open, onClose }: Props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={open} onClose={() => onClose()} fullWidth={false} maxWidth={"md"}>
        <DialogContent>
          <Container>
            <Headline>以下の内容でクイズを作成してもよろしいですか？</Headline>
            <Spacer size="xs" />
            <Quiz quiz={quiz} label={"問題"} />
            {choices.map((choice, index) => (
              <ChoiceCard
                choice={choice.choice}
                select={choice.is_right}
                label={"選択肢" + (index + 1)}
                key={index}
              />
            ))}
            <Spacer size="xxs" />
            <PrimaryButton
              label={"クイズを作成する"}
              fullWidth={true}
              onClick={() => dispatch(createQuiz(quiz, choices))}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmCreateDialog;
