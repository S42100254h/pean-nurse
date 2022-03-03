import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, Spacer, TextInput } from "../components/UIkit";
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

const CreateExperience = () => {
  const dispatch = useDispatch();

  const [level, setLevel] = useState(""),
    [experience, setExperience] = useState("");

  const inputLevel = useCallback(
    (event) => {
      setLevel(event.target.value);
    },
    [setLevel],
  );

  const inputExperience = useCallback(
    (event) => {
      setExperience(event.target.value);
    },
    [setExperience],
  );

  return (
    <Container>
      <Heading>経験値表作成</Heading>
      <Spacer size="sm" />
      <TextInput fullWidth={true} label={"レベル"} required={true} rows={1} value={level} onChange={inputLevel} />
      <Spacer size="xs" />
      <TextInput
        fullWidth={true}
        label={"経験値"}
        required={true}
        rows={1}
        value={experience}
        onChange={inputExperience}
      />
      <Spacer size="xs" />
      <PrimaryButton
        label={"経験値表を作成する"}
        fullWidth={true}
        disabled={!level || !experience}
        onClick={() => console.log("create experience")}
      />
    </Container>
  );
};

export default CreateExperience;
