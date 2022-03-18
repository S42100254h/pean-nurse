import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import { SetCategoryProfile } from "../components/SetCategoryProfile";
import { createCategory } from "../function/category";
import styled from "styled-components";

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

const CreateCategory = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(""),
    [caption, setCaption] = useState(""),
    [image, setImage] = useState<File | null>(null),
    [fileUrl, setFileUrl] = useState<string>(""),
    [uid, setUid] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName],
  );

  return (
    <Container>
      <Heading>カテゴリー作成</Heading>
      <Spacer size="sm" />
      <TextInput fullWidth={true} label={"カテゴリー名"} required={true} rows={1} value={name} onChange={inputName} />
      <Spacer size="xs" />
      <SetCategoryProfile
        image={image}
        fileUrl={fileUrl}
        caption={caption}
        uid={uid}
        setImage={setImage}
        setFileUrl={setFileUrl}
        setCaption={setCaption}
        setUid={setUid}
      />
      <Spacer size="xs" />
      <PrimaryButton
        label={"カテゴリーを作成する"}
        fullWidth={true}
        disabled={!name || !caption || !image || !uid}
        onClick={() => dispatch(createCategory(name, caption, image, uid))}
      />
    </Container>
  );
};

export default CreateCategory;
