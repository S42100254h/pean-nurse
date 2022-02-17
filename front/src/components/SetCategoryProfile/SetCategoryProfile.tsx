import React, { useCallback } from "react";
import { AttachFile, HighlightOff } from "@material-ui/icons";
import { Spacer, TextInput } from "../UIkit";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  justify-content: center;
  width: 130px;
  padding: 8px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.main};
  cursor: pointer;
  font-size: 12px;
  color: #fff;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const ImageContainer = styled.div`
  position: relative;
  width: max-content;
  height: 100%;
`;

const Image = styled.img`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 20px;
`;

const RemoveIcon = styled(HighlightOff)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
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
        <ImageContainer>
          <RemoveIcon onClick={() => setImage(null)} />
          <Image src={URL.createObjectURL(image)} />
        </ImageContainer>
      )}
    </div>
  );
};

export default SetCategoryProfile;
