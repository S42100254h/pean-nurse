import React, { useState } from "react";
import styled from "styled-components";

const TopContainer = styled.div`
  text-align: center;
  padding: 50px 100px;
`;

const Text = styled.p`
  font-size: 18px;
`;

const Help = () => {
  return (
    <TopContainer>
      <Text>良くある質問については、後日こちらに追記していきます。</Text>
    </TopContainer>
  );
};

export default Help;
