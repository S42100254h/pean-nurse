import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Add, Close } from "@material-ui/icons";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import { SetCategoryProfile } from "../components/SetCategoryProfile";
import { createCategory } from "../function/category";
import styled from "styled-components";

type LabelProps = {
  open: boolean;
};

const Container = styled.div`
  margin: 30px auto;
  max-width: 600px;
  padding: 35px 70px;
  height: auto;
  width: calc(100% - 2rem);
  background-color: #fff;
  box-shadow: 0 0 1px grey;
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const Label = styled.label<LabelProps>`
  color: #fff;
  display: flex;
  justify-content: center;
  width: 100px;
  padding: 8px;
  border-radius: 20px;
  background-color: #4dd0e1;
  cursor: pointer;
  font-size: 12px;
  float: left;
  margin-bottom: 15px;
  &:hover {
    opacity: 0.7;
  }
  background-color: ${(props) => (props.open ? props.theme.palette.secondary.main : props.theme.palette.primary.main)};
`;

const StyledAdd = styled(Add)`
  float: right;
  color: #f5f5f5;
  font-size: 14px;
  margin-right: 3px;
`;

const StyledClose = styled(Close)`
  float: right;
  color: #f5f5f5;
  font-size: 14px;
  margin-right: 3px;
`;

const CreateCategory = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(""),
    [open, setOpen] = useState(false),
    [caption, setCaption] = useState(""),
    [image, setImage] = useState<File | null>(null),
    [uid, setUid] = useState("");

  const inputCategory = useCallback(
    (event) => {
      setCategory(event.target.value);
    },
    [setCategory],
  );

  const handleOpenToggle = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Heading>カテゴリー作成</Heading>
      <Spacer size="sm" />
      <TextInput
        fullWidth={true}
        label={"カテゴリー名"}
        required={true}
        rows={1}
        value={category}
        onChange={inputCategory}
      />
      <Spacer size="xs" />
      <Label onClick={handleOpenToggle} open={open}>
        {!open ? <StyledAdd /> : <StyledClose />}
        {!open ? "詳細を追加" : "閉じる"}
      </Label>
      {open && (
        <SetCategoryProfile
          image={image}
          caption={caption}
          uid={uid}
          setImage={setImage}
          setCaption={setCaption}
          setUid={setUid}
        />
      )}
      <Spacer size="xs" />
      <PrimaryButton
        label={"カテゴリーを作成する"}
        fullWidth={true}
        disabled={open ? !category || !caption || !image || !uid : !category}
        onClick={() => dispatch(createCategory(category, caption, image, uid))}
      />
    </Container>
  );
};

export default CreateCategory;
