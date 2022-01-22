import React, { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton, SelectBox, Spacer, TextInput } from "../../components/UIkit";
import { MenuItem } from "@material-ui/core";
import styled from "styled-components";
import { Choice } from "../ConfirmDialog";

type Choice = {
  choice: string;
  isRight: string;
};

type Choices = {
  choices: Choice[];
  setChoices: React.Dispatch<React.SetStateAction<{
    choice: string;
    isRight: string;
  }[]>>;
};

const ButtonWrapper = styled.div`
  padding-left: 5px;
  height: 36px;
  float: right;
`;

const SetChoicesArea = ({choices, setChoices}: Choices) => {
  const [index, setIndex] = useState(0);

  const inputChoice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newChoices = [...choices];
    newChoices[index] = { choice: event.target.value, isRight: newChoices[index].isRight };
    setChoices(newChoices);
  };

  const inputIsRight = (event: React.ChangeEvent<{ value: unknown }>, index: number) => {
    const newChoices = [...choices];
    newChoices[index] = { choice: newChoices[index].choice, isRight: event.target.value as string };
    setChoices(newChoices);
  };

  const addChoice = () => {
    const newChoices = choices;
    newChoices[index] = { choice: "", isRight: "" };
    setChoices(newChoices);
    setIndex(newChoices.length);
  };
  
  const deleteChoice = (deleteIndex: number) => {
    const newChoices = choices.filter((_, index) => index !== deleteIndex);
    setChoices(newChoices);
  };

  const menus = [
    { label: "wrong", value: "false", id: "wrong" },
    { label: "right", value: "true", id: "right" },
  ];

  useEffect(() => {
    setIndex(choices.length);
  }, [choices.length]);

  return (
    <div>
      <div>
        {choices.length > 0 && (
          choices.map((choice, index) => (
            <div key={index}>
              <TextInput
                fullWidth={true}
                label={"選択肢" + (index + 1)}
                multiline={true}
                required={true}
                rows={1}
                value={choice.choice}
                type={"text"}
                onChange={(event) => inputChoice(event, index)}
              />
              <SelectBox
                displayEmpty={true}
                value={choice.isRight}
                variant="standard"
                onChange={(event) => inputIsRight(event, index)}
              >
                <MenuItem value="">- 選択してください -</MenuItem>
                {menus.map((menu) => (
                  <MenuItem value={menu.value} key={menu.id}>
                    {menu.label}
                  </MenuItem>
                ))}
              </SelectBox>
              <ButtonWrapper>
                <SecondaryButton
                  label="削除"
                  onClick={() => deleteChoice(index)}
                />
              </ButtonWrapper>
              <Spacer size="xs" />
            </div>
          ))
        )}
      </div>
      <PrimaryButton
        label="追加"
        onClick={() => addChoice()}
      />
    </div>
  )
};

export default SetChoicesArea;
