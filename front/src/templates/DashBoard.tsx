import React from "react";
import { Profile } from "../components/Profile";
import styled from "styled-components";
import { Spacer } from "../components/UIkit";
import bronze from "../assets/img/bronze.png";
import silver from "../assets/img/silver.png";
import gold from "../assets/img/gold.png";

const Container = styled.div`
  width: calc(100% - 5rem);
  max-width: 1080px;
  height: auto;
  min-height: 180px;
  margin: 0 auto;
`;

const Text = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const DashBoard = () => {
  return (
    <div>
      <Profile />
      <Spacer size="sm" />
      <Container>
        <img src={bronze} />
        <Text>学習中の問題はありません。</Text>
      </Container>
      <Container>
        <img src={silver} />
        <Text>学習中の問題はありません。</Text>
      </Container>
      <Container>
        <img src={gold} />
        <Text>学習中の問題はありません。</Text>
      </Container>
    </div>
  );
};

export default DashBoard;
