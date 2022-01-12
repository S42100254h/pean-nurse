import React from "react";
import { Profile } from "../components/Profile";
import styled from "styled-components";
import { Spacer } from "../components/UIkit";

const Container = styled.div`
  width: calc(100% - 5rem);
  max-width: 1080px;
  height: auto;
  min-height: 250px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 18px;
`;

const Text = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

const DashBoard = () => {
  return (
    <div>
      <Profile />
      <Spacer size="sm" />
      <Container>
        <Heading>学習中のコース</Heading>
        <Text>学習中のコースはありません。</Text>
      </Container>
      <Container>
        <Heading>修了コース</Heading>
        <Text>修了したコースはありません。</Text>
      </Container>
    </div>
  );
};

export default DashBoard;
