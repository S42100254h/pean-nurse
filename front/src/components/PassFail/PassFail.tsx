import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<Props>`
  padding: 3px 10px;
  background-color: ${(props) => (props.children === "正解" ? "#43a047" : "#D32F2F")};
  border-radius: 15px;
  display: inline-block;
  color: #fff;
`;

type Props = {
  checked?: boolean;
  isCorrect?: boolean;
};

export const PassFail = (props: Props) => {
  return <>{props.checked && <Wrapper>{props.isCorrect ? "正解" : "不正解"}</Wrapper>}</>;
};

export default PassFail;
