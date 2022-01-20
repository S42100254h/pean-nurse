import React, { useCallback, useEffect, useState } from "react";
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

const SetChoicesArea = (props: Choices) => {
  const [index, setIndex] = useState(0),
    [choice, setChoice] = useState(""),
    [isRight, setIsRight] = useState("");

  const inputChoice = useCallback((event) => {
    setChoice(event.target.value);
  }, [setChoice]);

  const inputIsRight = useCallback((event) => {
    setIsRight(event.target.value);
  }, [setIsRight]);

  const addChoice = () => {
    if (props.choices.slice(-1)[0].choice === "" || props.choices.slice(-1)[0].isRight === "") {
      return false;
    } else {
      const newChoices = props.choices;
      newChoices[index] = { choice: "", isRight: "" };
      props.setChoices(newChoices);
      setIndex(newChoices.length);
    }
  };
  
  const deleteChoice = (deleteIndex: number) => {
    const newChoices = props.choices.filter((item, index) => index !== deleteIndex);
    props.setChoices(newChoices);
  };

  const menus = [
    { label: "wrong", value: "false", id: "wrong" },
    { label: "right", value: "true", id: "right" },
  ];

  useEffect(() => {
    setIndex(props.choices.length)
  }, [props.choices.length]);

  return (
    <div>
      <div>
        {props.choices.length > 0 && (
          props.choices.map((choice, index) => (
            <div key={index}>
              <TextInput
                fullWidth={true}
                label={"選択肢" + (index + 1)}
                multiline={true}
                required={true}
                rows={1}
                value={choice.choice}
                type={"text"}
                onChange={inputChoice}
              />
              <SelectBox
                displayEmpty={true}
                value={choice.isRight}
                variant="standard"
                onChange={inputIsRight}
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
