import React, { useCallback, useState } from "react";
import { AttachFile, Close } from "@material-ui/icons";
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

const ImageLabel = styled.label`
  padding: 5px 8px 5px 5px;
  margin: 5px 0;
  font-size: 11px;
  display: inline-block;
  background-color: #dcdcdc;
  border-radius: 3px;
  justify-content: center;
`;

const StyledClose = styled(Close)`
  float: left;
  margin-right: 3px;
  color: #f5f5f5;
  font-size: 14px;
  cursor: pointer;
`;

type Props = {
  image: File | null;
  caption: string;
  uid: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  setUid: React.Dispatch<React.SetStateAction<string>>;
};

const SetCategoryProfile = ({ image, caption, uid, setImage, setCaption, setUid }: Props) => {
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
      {image && (
        <ImageLabel>
          <StyledClose onClick={() => setImage(null)} />
          {image.name}
        </ImageLabel>
      )}
    </div>
  );
};

export default SetCategoryProfile;
