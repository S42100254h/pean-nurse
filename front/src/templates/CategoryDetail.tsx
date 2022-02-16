import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
import axios from "axios";
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

type MatchParams = {
  id: string;
};

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();
  const [category, setCategory] = useState("");

  const inputCategory = useCallback(
    (event) => {
      setCategory(event.target.value);
    },
    [setCategory],
  );

  useEffect(() => {
    const categoryApiEndpoint = process.env.REACT_APP_API_URL + "categories/" + match.params.id;
    let isMounted = true;

    axios.get(categoryApiEndpoint).then((resp) => {
      if (isMounted) {
        setCategory(resp.data.name);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
