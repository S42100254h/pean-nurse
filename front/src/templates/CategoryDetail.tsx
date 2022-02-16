import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px auto;
  max-width: 800px;
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

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");

  const inputCategory = useCallback(
    (event) => {
      setCategory(event.target.value);
    },
    [setCategory],
  );

  return (
    <Container>
      <Heading>カテゴリー詳細</Heading>
      <Spacer size="xs" />
      <TextInput
        fullWidth={true}
        label={"カテゴリー名"}
        required={true}
        rows={1}
        value={category}
        onChange={inputCategory}
      />
      <Spacer size="sm" />
      <PrimaryButton
        label={"カテゴリーを更新する"}
        fullWidth={true}
        disabled={!category}
        onClick={() => console.log("update!")}
      />
    </Container>
  );
};

export default CategoryDetail;
