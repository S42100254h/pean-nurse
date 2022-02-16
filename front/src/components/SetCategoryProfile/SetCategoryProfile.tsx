import React, { useCallback, useState } from "react";
import { AttachFile } from "@material-ui/icons";
import { Spacer, TextInput } from "../UIkit";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  justify-content: center;
  width: 130px;
  padding: 8px;
  border-radius: 20px;
  background-color: #4dd0e1;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const SetCategoryProfile = () => {
  const [image, setImage] = useState<File | null>(null),
    [caption, setCaption] = useState(""),
    [uid, setUid] = useState("");

  const inputImage = useCallback(
    (event) => {
      setImage(event.target.files[0]);
      // enable to attach same file
      event.target.value = "";
    },
    [setImage],
  );

  const inputCaption = useCallback(
    (event) => {
      setCaption(event.target.value);
    },
    [setCaption],
  );

  const inputUid = useCallback(
    (event) => {
      setUid(event.target.value);
    },
    [setUid],
  );

  return (
    <div>
      <TextInput
        fullWidth={true}
        label={"見出し"}
        multiline={false}
        required={true}
        rows={1}
        value={caption}
        onChange={inputCaption}
      />
      <Spacer size="xxs" />
      <TextInput
        fullWidth={true}
        label={"ID"}
        multiline={false}
        required={true}
        rows={1}
        value={uid}
        onChange={inputUid}
      />
      <Spacer size="xs" />
      <Label>
        <AttachFile style={{ fontSize: "16px" }} />
        画像を添付する
        <StyledInput type="file" accept="image/jpeg, image/png" onChange={(e) => inputImage(e)} />
      </Label>
    </div>
  );
};

export default SetCategoryProfile;
