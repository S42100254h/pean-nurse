import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 1rem;
  height: auto;
  width: calc(100% - 2rem);
`;

const Heading = styled.h2`
  color: #4dd0e1;
  font-size: 1.563rem;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const TextContainer = styled.div`
  padding: 10px;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  background-color: #f0f8ff;
`;

const ForgetPasswordSent = () => {
  return (
    <Container>
      <Heading>メール送信完了</Heading>
      <div className="module-spacer--extra-small" />
      <TextContainer>
        <p>パスワード再設定用のURLを送信しました。</p>
        <p>記載された内容に従って、パスワードの再設定を行ってください。</p>
      </TextContainer>
    </Container>
  );
};

export default ForgetPasswordSent;